/*
  Warnings:

  - The primary key for the `Appointments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appointmentId` on the `Appointments` table. All the data in the column will be lost.
  - The primary key for the `Doctors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `doctorId` on the `Doctors` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Doctors` table. All the data in the column will be lost.
  - The primary key for the `Feedback` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `feedbackId` on the `Feedback` table. All the data in the column will be lost.
  - The primary key for the `Hospitals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hospitalId` on the `Hospitals` table. All the data in the column will be lost.
  - The primary key for the `InsurancePlans` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `availedPatients` on the `InsurancePlans` table. All the data in the column will be lost.
  - You are about to drop the column `planID` on the `InsurancePlans` table. All the data in the column will be lost.
  - The primary key for the `InsuranceProviders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `providerId` on the `InsuranceProviders` table. All the data in the column will be lost.
  - You are about to drop the column `subscribedPatients` on the `InsuranceProviders` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `InsuranceProviders` table. All the data in the column will be lost.
  - The primary key for the `Patients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `availedPlans` on the `Patients` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Patients` table. All the data in the column will be lost.
  - You are about to drop the column `subscribedProviders` on the `Patients` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Patients` table. All the data in the column will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `Appointments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `status` to the `Appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Doctors` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Feedback` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Hospitals` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `InsurancePlans` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id` to the `InsuranceProviders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Patients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Doctors" DROP CONSTRAINT "Doctors_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "Doctors" DROP CONSTRAINT "Doctors_userId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_patientId_fkey";

-- DropForeignKey
ALTER TABLE "InsurancePlans" DROP CONSTRAINT "InsurancePlans_providerId_fkey";

-- DropForeignKey
ALTER TABLE "InsuranceProviders" DROP CONSTRAINT "InsuranceProviders_userId_fkey";

-- DropForeignKey
ALTER TABLE "Patients" DROP CONSTRAINT "Patients_userId_fkey";

-- DropIndex
DROP INDEX "Appointments_doctorId_key";

-- DropIndex
DROP INDEX "Appointments_patientId_key";

-- DropIndex
DROP INDEX "Doctors_hospitalId_key";

-- DropIndex
DROP INDEX "Doctors_userId_key";

-- DropIndex
DROP INDEX "Feedback_doctorId_key";

-- DropIndex
DROP INDEX "Feedback_patientId_key";

-- DropIndex
DROP INDEX "InsurancePlans_providerId_key";

-- DropIndex
DROP INDEX "InsuranceProviders_userId_key";

-- DropIndex
DROP INDEX "Patients_userId_key";

-- AlterTable
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_pkey",
DROP COLUMN "appointmentId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "status" "STATUS" NOT NULL,
ALTER COLUMN "doctorId" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Doctors" DROP CONSTRAINT "Doctors_pkey",
DROP COLUMN "doctorId",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "hospitalId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Doctors_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_pkey",
DROP COLUMN "feedbackId",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "doctorId" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Hospitals" DROP CONSTRAINT "Hospitals_pkey",
DROP COLUMN "hospitalId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Hospitals_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "InsurancePlans" DROP CONSTRAINT "InsurancePlans_pkey",
DROP COLUMN "availedPatients",
DROP COLUMN "planID",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "providerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "InsurancePlans_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "InsuranceProviders" DROP CONSTRAINT "InsuranceProviders_pkey",
DROP COLUMN "providerId",
DROP COLUMN "subscribedPatients",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "InsuranceProviders_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Patients" DROP CONSTRAINT "Patients_pkey",
DROP COLUMN "availedPlans",
DROP COLUMN "patientId",
DROP COLUMN "subscribedProviders",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Patients_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "Subscribe" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "Subscribe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanPurchases" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "PlanPurchases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Doctors" ADD CONSTRAINT "Doctors_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscribe" ADD CONSTRAINT "Subscribe_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "InsuranceProviders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscribe" ADD CONSTRAINT "Subscribe_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsurancePlans" ADD CONSTRAINT "InsurancePlans_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "InsuranceProviders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanPurchases" ADD CONSTRAINT "PlanPurchases_planId_fkey" FOREIGN KEY ("planId") REFERENCES "InsurancePlans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanPurchases" ADD CONSTRAINT "PlanPurchases_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
