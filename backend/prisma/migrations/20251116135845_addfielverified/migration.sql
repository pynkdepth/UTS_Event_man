/*
  Warnings:

  - Added the required column `whatsapp` to the `CompetitionRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompetitionRegistration" ADD COLUMN     "whatsapp" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SeminarRegistration" ADD COLUMN     "idCardUrl" TEXT,
ADD COLUMN     "idNumber" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TalkshowRegistration" ADD COLUMN     "idCardUrl" TEXT,
ADD COLUMN     "idNumber" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WorkshopRegistration" ADD COLUMN     "idCardUrl" TEXT,
ADD COLUMN     "idNumber" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" SERIAL NOT NULL,
    "competitionRegistrationId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_competitionRegistrationId_fkey" FOREIGN KEY ("competitionRegistrationId") REFERENCES "CompetitionRegistration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
