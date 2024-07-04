const catchAsync = require("../utils/catchAsync");
const prisma = require("../utils/prismaClient");
const factory = require("./handlerFactoryPg");

const table = prisma.insurancePlans;

exports.setProviderId = (req, res, next) => {
  if (req.user.role == "insurer") {
    req.params.providerId = req.user._id;
    req.body.providerId = req.user._id;
  }
  next();
};

exports.setPlanPatientId = catchAsync(async (req, res, next) => {
  if (req.user.role == "patient") {
    const plan = await table.findUnique({
      where: {
        id: req.params.id,
      },
    });

    req.params.patientId = req.user._id;
    req.body.patientId = req.user._id;
    req.params.planId = req.params.id;
    req.body.planId = req.params.id;
    req.body.price = plan.premiumCost;
  }
  next();
});

exports.purchasePlan = catchAsync(async (req, res, next) => {
  const doc = await prisma.planPurchases.create({
    data: req.body,
  });

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getAllPlans = factory.getAll(table, {
  include: {
    insuranceProviders: true,
  },
});
exports.createPlan = factory.createOne(table, {
  include: {
    insuranceProviders: true,
  },
});
exports.getPlanById = factory.getOne(table, {
  include: {
    insuranceProviders: true,
  },
});
exports.updatePlan = factory.updateOne(table, {
  include: {
    insuranceProviders: true,
  },
});
exports.deletePlan = factory.deleteOne(table);

exports.getPlansByProviderId = async (req, res, next) => {
  try {
    const plans = await prisma.insurancePlans.findMany({
      where: {
        providerId: req.params.providerId,
      },
      include: {
        insuranceProviders: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        data: plans,
      },
    });
  } catch (err) {
    next(err);
  }
}

exports.getPlansByPatientId = async (req, res, next) => {
  try {
    const patient = await prisma.patients.findUnique({
      where: {
        id: req.params.patientId,
      },
      include: {
        purchasedPlans: {
          include: {
            plans: true,
          },
        }
      },
    });

    console.log(patient);

    res.status(200).json({
      status: "success",
      data: {
        data: patient.purchasedPlans[0],
      },
    });
  } catch (err) {
    next(err);
  }
}
