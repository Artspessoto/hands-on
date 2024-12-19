-- CreateEnum
CREATE TYPE "CampaignType" AS ENUM ('FOOD', 'CLOTHING', 'HYGIENE', 'MEDICATION', 'COATS', 'EDUCATIONAL_MATERIAL', 'OTHERS');

-- CreateEnum
CREATE TYPE "DonationType" AS ENUM ('ITEMS', 'MONEY', 'BOTH');

-- CreateTable
CREATE TABLE "campaigns" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "targetItems" INTEGER,
    "targetMoney" DOUBLE PRECISION,
    "type" "CampaignType" NOT NULL,
    "location" TEXT NOT NULL,
    "leaderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
