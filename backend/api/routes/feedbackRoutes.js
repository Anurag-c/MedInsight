const express = require("express");
const feedbackController = require("./../controllers/feedbackController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

// feedback routes need authentication
router.use(authController.protect);

router
  .route("/")
  .get(
    authController.restrictTo("patient", "doctor", "admin"),
    feedbackController.setDoctorPatientIds,
    feedbackController.getAllFeedbacks
  )
  .post(
    authController.restrictTo("patient"),
    feedbackController.setDoctorPatientIds,
    feedbackController.createFeedback
  );

router
  .route("/:id")
  .get(
    authController.restrictTo("patient", "doctor", "admin"),
    feedbackController.setDoctorPatientIds,
    feedbackController.getFeedback
  )
  .patch(
    authController.restrictTo("patient", "admin"),
    feedbackController.setDoctorPatientIds,
    feedbackController.updateFeedback
  )
  .delete(
    authController.restrictTo("patient", "admin"),
    feedbackController.setDoctorPatientIds,
    feedbackController.deleteFeedback
  );

module.exports = router;
