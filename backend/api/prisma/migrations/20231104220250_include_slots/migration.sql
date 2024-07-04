/*
  Warnings:

  - You are about to drop the column `appointmentDateTime` on the `Appointments` table. All the data in the column will be lost.
  - You are about to drop the column `doctorId` on the `Appointments` table. All the data in the column will be lost.
  - You are about to drop the column `availabilitySchedule` on the `Doctors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slotId]` on the table `Appointments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slotId` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_doctorId_fkey";

-- AlterTable
ALTER TABLE "Appointments" DROP COLUMN "appointmentDateTime",
DROP COLUMN "doctorId",
ADD COLUMN     "slotId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Doctors" DROP COLUMN "availabilitySchedule";

-- CreateTable
CREATE TABLE "Slots" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Slots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_slotId_key" ON "Appointments"("slotId");

-- AddForeignKey
ALTER TABLE "Slots" ADD CONSTRAINT "Slots_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
