/*
  Warnings:

  - You are about to drop the column `leftId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `leftValue` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `rightId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `rightValue` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `winnerId` on the `Game` table. All the data in the column will be lost.
  - Changed the type of `resourceType` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('person', 'starship');

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "leftId",
DROP COLUMN "leftValue",
DROP COLUMN "rightId",
DROP COLUMN "rightValue",
DROP COLUMN "winnerId",
DROP COLUMN "resourceType",
ADD COLUMN     "resourceType" "ResourceType" NOT NULL;

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "leftId" TEXT NOT NULL,
    "rightId" TEXT NOT NULL,
    "leftValue" INTEGER NOT NULL,
    "rightValue" INTEGER NOT NULL,
    "winnerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
