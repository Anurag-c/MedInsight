const prisma = require("../utils/prismaClient");
const factory = require("./handlerFactoryPg");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const table = prisma.slots;

exports.setDoctorPatientIds = (req, res, next) => {
  if (req.user.role == "patient") {
    req.params.patientId = req.user._id;
  } else if (req.user.role == "doctor") {
    req.params.doctorId = req.user._id;
  }
  next();
};

// adding multiple slots used for adding slots when doctor gives range of availability
exports.addMultipleSlots = async (slots) => {
  if (slots.length == 0) {
    return;
  }

  const existingSlots = await table.findMany({
    where: {
      doctorId: slots[0].doctorId,
      date: slots[0].date,
    },
  });

  for (const slot of slots) {
    const overlap = existingSlots.some((existingSlot) => {
      return (
        new Date(existingSlot.startTime) < new Date(slot.endTime) &&
        new Date(existingSlot.endTime) > new Date(slot.startTime)
      );
    });

    if (!overlap) {
      await table.create({ data: slot });
    }
  }
};

exports.checkSlot = catchAsync(async (req, res, next) => {
  const doc = await table.findUnique({
    where: {
      id: req.params.id,
      isBooked: false,
    },
  });

  if (!doc) {
    return next(new AppError("No available slot with that ID", 404));
  }

  next();
});

exports.bookSlot = (req, res, next) => {
  if (req.user.role == "patient") req.body.patientId = req.user._id;
  req.body.isBooked = true;
  next();
};

exports.cancelSlot = (req, res, next) => {
  req.body.patientId = null;
  req.body.isBooked = false;
  next();
};

exports.getAllSlots = factory.getAll(table, {
  include: {
    doctors: { include: { feedbacksRecieved: true, hospitals: true } },
    patients: true,
  },
});
exports.getSlot = factory.getOne(table, {
  include: { doctors: true, patients: true },
});
exports.updateSlot = factory.updateOne(table, {
  include: { doctors: true, patients: true },
});
exports.deleteAllSlots = factory.deleteAll(table);
