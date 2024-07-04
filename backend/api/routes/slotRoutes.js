const express = require("express");
const slotController = require("../controllers/slotController");
const authController = require("../controllers/authController");

const router = express.Router();

// protect all routes after this
router.use(authController.protect); // verifies JWT and sets user

router
  .route("/")
  .get(
    authController.restrictTo("patient", "doctor", "admin"),
    slotController.setDoctorPatientIds,
    slotController.getAllSlots
  )
  .delete(
    authController.restrictTo("doctor", "admin"),
    slotController.setDoctorPatientIds,
    slotController.deleteAllSlots
  );

router
  .route("/:id")
  .get(
    authController.restrictTo("doctor", "admin"),
    slotController.setDoctorPatientIds,
    slotController.getSlot
  );

router.patch(
  "/:id/book",
  authController.restrictTo("patient", "admin"),
  slotController.checkSlot,
  slotController.bookSlot,
  slotController.updateSlot
);

router.patch(
  "/:id/cancel",
  authController.restrictTo("patient", "doctor", "admin"),
  slotController.cancelSlot,
  slotController.updateSlot
);

module.exports = router;
