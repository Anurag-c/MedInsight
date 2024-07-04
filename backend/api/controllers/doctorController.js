const prisma = require("../utils/prismaClient");
const factory = require("./handlerFactoryPg");
const catchAsync = require("../utils/catchAsync");
const slotController = require("./slotController");

const table = prisma.Doctors;

const insertSlots = async (doctorId, date, startTime, endTime) => {
  const slots = [];
  const [year, month, day] = date.split("T")[0].split("-");
  const startDate = new Date(`${year}-${month}-${day}T${startTime}Z`);
  const endDate = new Date(`${year}-${month}-${day}T${endTime}Z`);

  let start = new Date(startDate);
  let end = new Date(startDate);
  end.setMinutes(end.getMinutes() + 45);
  while (end < endDate) {
    slots.push({
      doctorId,
      date,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    });

    start.setMinutes(start.getMinutes() + 45);
    end.setMinutes(end.getMinutes() + 45);
  }

  console.log(doctorId, date, startTime, endTime);

  await slotController.addMultipleSlots(slots);
};

function getAllOccurrencesForNextTwoMonths(startDay) {
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const currentDate = new Date();
  const startDayIndex = daysOfWeek.indexOf(startDay.toLowerCase());
  const daysToAdd = startDayIndex - currentDate.getDay() + 7;
  currentDate.setDate(currentDate.getDate() + daysToAdd);

  const nextTwoMonthsOccurrences = [];
  while (nextTwoMonthsOccurrences.length < 9) {
    const currentDateClone = new Date(currentDate);
    currentDateClone.setDate(currentDate.getDate());
    const formattedDate = currentDateClone.toISOString();
    nextTwoMonthsOccurrences.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return nextTwoMonthsOccurrences;
}

exports.makeAndInsertSlots = catchAsync(async (req, res, next) => {
  const availability = req.body.availability;
  if (!availability) {
    return next();
  }

  for (const { day, startTime, endTime } of availability) {
    const dates = getAllOccurrencesForNextTwoMonths(day);
    for (const date of dates) {
      await insertSlots(req.params.id, date, startTime, endTime);
    }
  }

  delete req.body.availability;
  return next();
});

exports.getDoctor = factory.getOne(table, {
  include: { slots: true, feedbacksRecieved: true, hospitals: true },
});
exports.getAllDoctors = factory.getAll(table, {
  include: { feedbacksRecieved: true, hospitals: true },
});
exports.deleteDoctor = factory.deleteOne(table);
exports.updateDoctor = factory.updateOne(table, {
  include: { slots: true, feedbacksRecieved: true },
});

exports.getAllSpecs = catchAsync(async (req, res, next) => {
  const allDoctors = await table.findMany({});
  const spec = {};
  for (const { specialization } of allDoctors) {
    if (!specialization) {
      continue;
    }
    spec[specialization.toLowerCase().trim()] = true;
  }

  res.status(200).json({
    status: "success",
    data: {
      data: Object.keys(spec),
    },
  });
});
