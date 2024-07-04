const express = require("express");
const patientController = require("../controllers/patientController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

// protect all routes after this
router.use(authController.protect); // verifies JWT and sets user
router.use(authController.restrictTo("patient"));

router.get("/me", userController.getMe, patientController.getPatient);
router.patch(
  "/updateMe",
  userController.getMe,
  patientController.updatePatient
);

router
  .route("/:id")
  .get(
    authController.restrictTo("doctor", "admin"),
    userController.getUserById,
    patientController.getPatient
  )
  .patch(authController.restrictTo("admin"), patientController.updatePatient)
  .delete(authController.restrictTo("admin"), patientController.deletePatient);

module.exports = router;
