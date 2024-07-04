const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err.name, err);
  console.log("UNCAUGHT EXCEPTION SERVER SHUTDOWN");
});

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err));

const app = require("./app");
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io"); // Add this
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const oneToOneMessage = require("./models/oneToOneMessage");
const AppError = require("./utils/appError");

const io = new Server(server, {
  cors: {
    origin: ["https://medinsights-8f8a.onrender.com", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      process.env.JWT_SECRET,
      function (err, decoded) {
        if (err) return next(new AppError("Authentication error"));
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    next(new AppError("Authentication error"));
  }
});

io.on("connection", async (socket) => {
  const user_id = socket.decoded.id;

  if (user_id != null && Boolean(user_id)) {
    try {
      const user = await User.findByIdAndUpdate(user_id, {
        socket_id: socket.id,
        status: "Online",
      });
      socket.user = user;
      console.log(`User connected Socket ID: ${socket.id}`);
    } catch (e) {
      console.log("No user found");
      console.log(e);
      socket.disconnect(0);
    }
  } else {
    console.log("No user found");
    socket.disconnect(0);
  }
  socket.on("get_direct_conversations", async ({ user_id }, callback) => {
    const existing_conversations = await oneToOneMessage
      .find({
        participants: { $all: [user_id] },
      })
      .populate("participants", "name photo _id email status");

    const participantsMap = new Map();

    // Iterate through the documents to identify duplicates and track the oldest created_at
    for (const doc of existing_conversations) {
      const smallerSet = [doc.participants[0]._id, doc.participants[1]._id]
      const participants = smallerSet.sort().join(","); // unique key

      if (participantsMap.has(participants)) {
        await oneToOneMessage.deleteOne({ _id: doc._id });
        console.log(
          `Removed duplicate document with participants: ${participants}`
        );
      } else {
        participantsMap.set(participants, doc);
      }
    }

    callback(Array.from(participantsMap.values()));
  });

  socket.on("start_conversation", async (to) => {
    const from = socket.user.id;
    console.log(to);
    console.log(from);
    // check whether the to user exists
    const toUser = await User.findById(to);
    console.log(toUser, 'toUser')
    if (!toUser) {
      console.log(`No user with id : ${to}`);
      socket.emit("no_user", null);
    }
    // check if there is any existing conversation
    const existing_conversations = await oneToOneMessage
      .find({
        participants: { $size: 2, $all: [to, from] },
      })
      .populate("participants", "name photo _id email status");

    console.log(existing_conversations[0], "Existing Conversation");

    // if no => create a new OneToOneMessage doc & emit event "start_chat" & send conversation details as payload
    if (existing_conversations.length === 0) {
      let new_chat = await oneToOneMessage.create({
        participants: [to, from],
      });

      new_chat = await oneToOneMessage
        .findById(new_chat)
        .populate("participants", "name photo _id email status");

      console.log(new_chat);

      socket.emit("start_chat", new_chat);
    }
    // if yes => just emit event "start_chat" & send conversation details as payload
    else {
      socket.emit("start_chat", existing_conversations[0]);
    }
  });

  socket.on("get_messages", async (data, callback) => {
    try {
      const { messages } = await oneToOneMessage
        .findById(data.conversation_id)
        .select("messages");
      callback(messages);
    } catch (error) {
      console.log(error);
    }
  });

  // Handle incoming text/link messages
  socket.on("text_message", async (data) => {
    console.log("Received message:", data);

    const { message, conversation_id, from, to } = data;

    const to_user = await User.findById(to);
    const from_user = await User.findById(from);

    const new_message = {
      to: to,
      from: from,
      text: message,
    };

    // fetch OneToOneMessage Doc & push a new message to existing conversation, save to db
    const chat = await oneToOneMessage.findById(conversation_id);
    chat.messages.push(new_message);
    await chat.save({ new: true, validateModifiedOnly: true });

    // emit incoming_message -> to user
    io.to(to_user?.socket_id).emit("new_message", {
      conversation_id,
      message: new_message,
    });

    // emit outgoing_message -> from user
    io.to(from_user?.socket_id).emit("new_message", {
      conversation_id,
      message: new_message,
    });
  });

  socket.on("end", async (data) => {
    // Find user by ID and set status as offline
    if (data.user_id) {
      await User.findByIdAndUpdate(data.user_id, { status: "Offline" });
    }
    // broadcast to all conversation rooms of this user that this user is offline (disconnected)
    console.log("closing connection");
    socket.disconnect(0);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION SERVER SHUTDOWN");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECIEVED, shutting down gracefully !!!");
  server.close(() => {
    console.log("Process terminated");
  });
});
