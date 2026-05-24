-- CreateEnum
CREATE TYPE "CompetitionType" AS ENUM ('POSTER', 'UIUX', 'WEB');

-- CreateEnum
CREATE TYPE "ParticipantType" AS ENUM ('INDIVIDU', 'TEAM');

-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('SMA', 'MAHASISWA');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('UMUM', 'MAHASISWA');

-- CreateEnum
CREATE TYPE "WorkshopChoice" AS ENUM ('CYBER_SECURITY', 'ARTIFICIAL_INTELLIGENCE', 'MOBILE_DEV');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionRegistration" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "competition" "CompetitionType" NOT NULL,
    "participantType" "ParticipantType" NOT NULL,
    "degree" "Degree" NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "teamName" TEXT,
    "school" TEXT NOT NULL,
    "leaderName" TEXT,
    "memberCardUrl" TEXT NOT NULL,
    "paymentUrl" TEXT NOT NULL,
    "igFollowUrl" TEXT NOT NULL,

    CONSTRAINT "CompetitionRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeminarRegistration" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "paymentUrl" TEXT NOT NULL,
    "igFollowUrl" TEXT NOT NULL,

    CONSTRAINT "SeminarRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopRegistration" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "workshop" "WorkshopChoice" NOT NULL,
    "category" "Category" NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "paymentUrl" TEXT NOT NULL,
    "igFollowUrl" TEXT NOT NULL,

    CONSTRAINT "WorkshopRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalkshowRegistration" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "paymentUrl" TEXT NOT NULL,
    "igFollowUrl" TEXT NOT NULL,

    CONSTRAINT "TalkshowRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
