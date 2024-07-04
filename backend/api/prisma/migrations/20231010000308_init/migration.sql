-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('doctor', 'insurer', 'patient');

-- CreateEnum
CREATE TYPE "THEMES" AS ENUM ('theme1', 'theme2');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('scheduled', 'cancelled', 'completed');

-- CreateTable
CREATE TABLE "Users" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "photo" BYTEA,
    "theme" "THEMES" NOT NULL,
    "role" "ROLES" NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
