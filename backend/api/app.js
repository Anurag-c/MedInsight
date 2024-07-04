const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const patientRouter = require("./routes/patientRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const feedbackRouter = require("./routes/feedbackRoutes");
const slotRouter = require("./routes/slotRoutes");
const planRouter = require("./routes/planRoutes");
const searchRouter = require("./routes/searchRoutes");
const subscribeRouter = require("./routes/subscribeRoutes");
const purchasePlanRouter = require("./routes/purchasePlanRoutes");
const insurerRouter = require("./routes/insurerRoutes");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

app.enable("trust proxy");

// Data sanitization against XSS(cross side scripting)
app.use(xss());

//Set security HTTP headers
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": [
        "'self'",
        "*.cloudflare.com",
        "*.mapbox.com",
        "*.stripe.com",
      ],
      "style-src": [
        "'self'",
        "*.mapbox.com",
        "fonts.googleapis.com",
        "'unsafe-inline'",
      ],
      "connect-src": ["'self'", "ws://localhost:8080", "*.mapbox.com"],
      "worker-src": ["'self'", "blob:"],
      "frame-src": ["'self'", "*.stripe.com"],
    },
  })
);

// CORS
app.use(
  cors({
    // origin: true, // local development
    origin: ["https://medinsights-8f8a.onrender.com", "http://localhost:3000"], // production
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/*
// Limit Requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
*/

// Body parser, reading data from body to req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSql query Injection
app.use(mongoSanitize());

// prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

app.use(compression());

// logging cookies
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// API ROUTES
app.use("/api/v1/users/doctor", doctorRouter);
app.use("/api/v1/users/patient", patientRouter);
app.use("/api/v1/users/insurer", insurerRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/feedbacks", feedbackRouter);
app.use("/api/v1/slots", slotRouter);
app.use("/api/v1/plans", planRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/subscribe", subscribeRouter);
app.use("/api/v1/purchasePlans", purchasePlanRouter);

app.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to the MedInsights Auth API v1.0",
  });
});
app.get("/apiDocs", (req, res, next) => {
  res.redirect(process.env.API_DOCS);
});

// Routes which are not defined
app.all("*", (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  next(err);
});

// All errors come down to this point
app.use(globalErrorHandler);

module.exports = app;
