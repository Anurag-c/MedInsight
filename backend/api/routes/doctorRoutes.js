const express = require("express");
const doctorController = require("../controllers/doctorController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

// protect all routes after this
router.use(authController.protect); // verifies JWT and sets user

router.get(
  "/",
  authController.restrictTo("patient", "admin"),
  userController.setRole("doctor"),
  userController.getAllUsers
);
router.get(
  "/prisma",
  doctorController.getAllDoctors
);
router.get(
  "/specs",
  authController.restrictTo("patient", "admin"),
  doctorController.getAllSpecs
);
router.get("/me", userController.getMe, doctorController.getDoctor);
router.patch(
  "/updateMe",
  userController.getMe,
  doctorController.makeAndInsertSlots,
  doctorController.updateDoctor
);

router
  .route("/:id")
  .get(
    authController.restrictTo("patient", "admin"),
    doctorController.getDoctor
  )
  .patch(authController.restrictTo("admin"), doctorController.updateDoctor)
  .delete(authController.restrictTo("admin"), doctorController.deleteDoctor);

module.exports = router;
