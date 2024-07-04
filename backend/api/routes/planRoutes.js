const express = require("express");
const planController = require("./../controllers/planController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

// feedback routes need authentication
router.use(authController.protect);

router
  .route("/")
  .get(planController.setProviderId, planController.getPlansByProviderId)
  .post(
    authController.restrictTo("insurer", "admin"),
    planController.setProviderId,
    planController.createPlan,
  ).get(
    planController.setProviderId,
    planController.getPlansByProviderId,
  );

router.post(
  "/purchase/:id",
  planController.setPlanPatientId,
  planController.purchasePlan
);

router
  .route("/:id")
  .get(planController.getPlanById)
  .patch(
    authController.restrictTo("insurer", "admin"),
    planController.updatePlan
  )
  .delete(
    authController.restrictTo("insurer", "admin"),
    planController.deletePlan
  );

router.route("/patient/:patientId")
  .get(planController.getPlansByPatientId);

module.exports = router;
