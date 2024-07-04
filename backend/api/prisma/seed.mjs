import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const __dirname = path.resolve();

async function main() {
  let cnt = 0;
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./healthcare_data.json"), "utf-8")
  );

  // Seeding Hospitals
  for (const hospital of data.Hospitals) {
    await prisma.hospitals.create({
      data: hospital,
    });
  }

  // Seeding Doctors
  for (const doctor of data.Doctors) {
    doctor.name = `random name ${cnt}`;
    cnt++;
    await prisma.doctors.create({
      data: doctor,
    });
  }

  // Seeding Patients
  for (const patient of data.Patients) {
    await prisma.patients.create({
      data: patient,
    });
  }

  // Seeding Feedback
  for (const feedback of data.Feedback) {
    await prisma.feedback.create({
      data: feedback,
    });
  }

  // Seeding slots
  for (const slot of data.Slots) {
    const [month, day, year] = slot.date.split("-");
    slot.startTime = `${year}-${month}-${day}T${slot.startTime}Z`;
    slot.endTime = `${year}-${month}-${day}T${slot.endTime}Z`;
    slot.date = new Date(`${year}-${month}-${day}`).toISOString();
    await prisma.slots.create({
      data: slot,
    });
  }

  // Seeding InsuranceProviders
  for (const provider of data.InsuranceProviders) {
    await prisma.insuranceProviders.create({
      data: provider,
    });
  }

  // Seeding Subscribe
  for (const subscribe of data.Subscribe) {
    await prisma.subscribe.create({
      data: subscribe,
    });
  }

  // Seeding InsurancePlans
  for (const plan of data.InsurancePlans) {
    await prisma.insurancePlans.create({
      data: plan,
    });
  }

  // Seeding PlanPurchases
  for (const purchase of data.PlanPurchases) {
    await prisma.planPurchases.create({
      data: purchase,
    });
  }

  console.log("Database seeded successfully!");
}

const deleteAll = async () => {
  await prisma.feedback.deleteMany({});
  await prisma.slots.deleteMany({});
  await prisma.subscribe.deleteMany({});
  await prisma.planPurchases.deleteMany({});
  await prisma.insurancePlans.deleteMany({});
  await prisma.insuranceProviders.deleteMany({});
  await prisma.doctors.deleteMany({});
  await prisma.patients.deleteMany({});
  await prisma.hospitals.deleteMany({});
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
