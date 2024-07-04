-- DropForeignKey
ALTER TABLE "Doctors" DROP CONSTRAINT "Doctors_hospitalId_fkey";

-- AlterTable
ALTER TABLE "Doctors" ALTER COLUMN "hospitalId" DROP NOT NULL,
ALTER COLUMN "specialization" DROP NOT NULL,
ALTER COLUMN "treatsCovid" SET DEFAULT false;

-- AlterTable
ALTER TABLE "InsuranceProviders" ALTER COLUMN "providerName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Patients" ALTER COLUMN "covid19Symptoms" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Doctors" ADD CONSTRAINT "Doctors_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
