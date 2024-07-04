const express = require("express");
const insurerController = require("../controllers/insurerController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

// protect all routes after this
router.use(authController.protect); // verifies JWT and sets user

router.get("/me", userController.getMe, insurerController.getInsurer);
router.patch(
  "/updateMe",
  userController.getMe,
  insurerController.updateInsurer
);

router
  .route("/:id")
  .get(
    authController.restrictTo("admin"),
    userController.getUserById,
    insurerController.getInsurer
  )
  .patch(authController.restrictTo("admin"), insurerController.updateInsurer)
  .delete(authController.restrictTo("admin"), insurerController.deleteInsurer);

module.exports = router;
