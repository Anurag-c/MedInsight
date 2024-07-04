const prisma = require("../utils/prismaClient");
const factory = require("./handlerFactoryPg");

const table = prisma.feedback;

exports.setDoctorPatientIds = (req, res, next) => {
  if (req.user.role == "patient") {
    req.params.patientId = req.user._id;
    req.body.patientId = req.user._id;
  } else if (req.user.role == "doctor") {
    req.params.doctorId = req.user._id;
    req.body.doctorId = req.user._id;
  }
  next();
};

exports.getAllFeedbacks = factory.getAll(table);
exports.createFeedback = factory.createOne(table);
exports.getFeedback = factory.getOne(table);
exports.updateFeedback = factory.updateOne(table);
exports.deleteFeedback = factory.deleteOne(table);
