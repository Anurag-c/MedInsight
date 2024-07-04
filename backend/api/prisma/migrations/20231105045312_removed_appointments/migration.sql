/*
  Warnings:

  - You are about to drop the `Appointments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_slotId_fkey";

-- AlterTable
ALTER TABLE "Slots" ADD COLUMN     "patientId" TEXT;

-- DropTable
DROP TABLE "Appointments";

-- AddForeignKey
ALTER TABLE "Slots" ADD CONSTRAINT "Slots_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
