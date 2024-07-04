const express = require("express");
const planPurchaseController = require("./../controllers/planPurchaseController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

// feedback routes need authentication
router.use(authController.protect);

router
  .route("/")
  .post(
    authController.restrictTo("patient", "admin"),
    planPurchaseController.setPatientId,
    planPurchaseController.createPurchasePlan,
  );

router
  .route("/:id")
  .get(planPurchaseController.getPurchasedPlan)
  .patch(
    authController.restrictTo("patient", "admin"),
    planPurchaseController.updatePurchasedPlan
  )
  .delete(
    authController.restrictTo("patient", "admin"),
    planPurchaseController.deletePurchasedPlan
  );

module.exports = router;
