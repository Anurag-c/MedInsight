/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `firstName` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photo` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
ALTER COLUMN "userId" DROP DEFAULT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "photo" SET NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");
DROP SEQUENCE "Users_userId_seq";

-- CreateTable
CREATE TABLE "Patients" (
    "userId" TEXT NOT NULL,
    "patientId" SERIAL NOT NULL,
    "medicalHistory" TEXT,
    "covid19Symptoms" JSONB NOT NULL,
    "subscribedProviders" INTEGER[],
    "availedPlans" INTEGER[],

    CONSTRAINT "Patients_pkey" PRIMARY KEY ("patientId")
);

-- CreateTable
CREATE TABLE "Doctors" (
    "userId" TEXT NOT NULL,
    "doctorId" SERIAL NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "specialization" TEXT NOT NULL,
    "availabilitySchedule" JSONB NOT NULL,
    "treatsCovid" BOOLEAN NOT NULL,

    CONSTRAINT "Doctors_pkey" PRIMARY KEY ("doctorId")
);

-- CreateTable
CREATE TABLE "InsuranceProviders" (
    "userId" TEXT NOT NULL,
    "providerId" SERIAL NOT NULL,
    "providerName" TEXT NOT NULL,
    "subscribedPatients" INTEGER[],

    CONSTRAINT "InsuranceProviders_pkey" PRIMARY KEY ("providerId")
);

-- CreateTable
CREATE TABLE "Hospitals" (
    "hospitalId" SERIAL NOT NULL,
    "bedCount" INTEGER NOT NULL,
    "occupiedCount" INTEGER NOT NULL,
    "location" DOUBLE PRECISION[],

    CONSTRAINT "Hospitals_pkey" PRIMARY KEY ("hospitalId")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "doctorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "feedbackId" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "review" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("feedbackId")
);

-- CreateTable
CREATE TABLE "Appointments" (
    "doctorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "appointmentId" SERIAL NOT NULL,
    "appointmentDateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("appointmentId")
);

-- CreateTable
CREATE TABLE "InsurancePlans" (
    "providerId" INTEGER NOT NULL,
    "planID" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "planDescription" TEXT NOT NULL,
    "premiumCost" DECIMAL(65,30) NOT NULL,
    "availedPatients" INTEGER[],

    CONSTRAINT "InsurancePlans_pkey" PRIMARY KEY ("planID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patients_userId_key" ON "Patients"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctors_userId_key" ON "Doctors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctors_hospitalId_key" ON "Doctors"("hospitalId");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceProviders_userId_key" ON "InsuranceProviders"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_doctorId_key" ON "Feedback"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_patientId_key" ON "Feedback"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_doctorId_key" ON "Appointments"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_patientId_key" ON "Appointments"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePlans_providerId_key" ON "InsurancePlans"("providerId");

-- AddForeignKey
ALTER TABLE "Patients" ADD CONSTRAINT "Patients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctors" ADD CONSTRAINT "Doctors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctors" ADD CONSTRAINT "Doctors_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("hospitalId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceProviders" ADD CONSTRAINT "InsuranceProviders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("doctorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("patientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("doctorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("patientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsurancePlans" ADD CONSTRAINT "InsurancePlans_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "InsuranceProviders"("providerId") ON DELETE RESTRICT ON UPDATE CASCADE;
