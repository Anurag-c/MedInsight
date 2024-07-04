const prisma = require("../utils/prismaClient");
const factory = require("./handlerFactoryPg");

const table = prisma.patients;
exports.getPatient = factory.getOne(table, {
  include: {
    feedbacksGiven: true,
    slots: true,
    subscribedProviders: true,
    purchasedPlans: {
      include: {
        plans: true,
      },
    },
  },
});
exports.deletePatient = factory.deleteOne(table);
exports.updatePatient = factory.updateOne(table);
