const prisma = require("../utils/prismaClient");
const factory = require("./handlerFactoryPg");

const table = prisma.insuranceProviders;

exports.getAllProviders = factory.getAll(table, {
  include: { insurancePlans: true },
});
exports.getProvider = factory.getOne(table, {
  include: { insurancePlans: true, subscribedPatients: true },
});
