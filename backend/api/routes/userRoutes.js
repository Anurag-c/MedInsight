const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const providerController = require("../controllers/providerController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.post("/forgotTwoFactor", authController.forgotTwoFactor);

// protect all routes after this
router.use(authController.protect); // verifies JWT and sets user

// provider routes
router.get(
  "/providers",
  userController.setRole("insurer"),
  userController.getAllUsers
);
router.get(
  "/providers/me",
  userController.getMe,
  providerController.getProvider
);
router.get("/providers/prisma", providerController.getAllProviders);
router.get("/providers/:id", providerController.getProvider);

// generic user routes
router.get("/me", userController.getMe, userController.getUser);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);
router.patch("/updateMyPassword", authController.updatePassword);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
