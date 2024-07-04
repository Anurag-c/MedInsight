const prisma = require("../utils/prismaClient");
const factory = require("./handlerFactoryPg");

const table = prisma.subscribe;

exports.setPatientId = (req, res, next) => {
  if (req.user.role == "patient") {
    req.params.patientId = req.user._id;
    req.body.patientId = req.user._id;
  }
  next();
};

exports.getAllSubscribes = factory.getAll(table);
exports.createSubscribe = factory.createOne(table);
exports.getSubscribe = factory.getOne(table);
exports.updateSubscribe = factory.updateOne(table);
exports.deleteSubscribe = factory.deleteOne(table);
