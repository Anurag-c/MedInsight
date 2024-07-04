const prisma = require("../utils/prismaClient");
const factory = require("./handlerFactoryPg");

const table = prisma.insuranceProviders;
exports.getInsurer = factory.getOne(table);
exports.deleteInsurer = factory.deleteOne(table);
exports.updateInsurer = factory.updateOne(table);
