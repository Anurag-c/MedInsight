/*
  Warnings:

  - Added the required column `name` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctors" ADD COLUMN     "name" TEXT NOT NULL;
