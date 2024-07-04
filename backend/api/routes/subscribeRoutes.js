const express = require("express");
const subscribeController = require("./../controllers/subscribeController");
const authController = require("./../controllers/authController");

const router = express.Router();

// subscribe routes need authentication
router.use(authController.protect);

router
  .route("/")
  .get(
    authController.restrictTo("patient", "admin"),
    subscribeController.setPatientId,
    subscribeController.getAllSubscribes
  )
  .post(
    authController.restrictTo("patient", "admin"),
    subscribeController.setPatientId,
    subscribeController.createSubscribe
  );

router
  .route("/:id")
  .get(
    authController.restrictTo("patient", "admin"),
    subscribeController.setPatientId,
    subscribeController.getSubscribe
  )
  .patch(
    authController.restrictTo("patient", "admin"),
    subscribeController.setPatientId,
    subscribeController.updateSubscribe
  )
  .delete(
    authController.restrictTo("patient", "admin"),
    subscribeController.setPatientId,
    subscribeController.deleteSubscribe
  );

module.exports = router;
