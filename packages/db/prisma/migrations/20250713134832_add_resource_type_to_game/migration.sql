/*
  Warnings:

  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `leftId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leftValue` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resourceType` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rightId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rightValue` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "leftId" TEXT NOT NULL,
ADD COLUMN     "leftValue" INTEGER NOT NULL,
ADD COLUMN     "resourceType" TEXT NOT NULL,
ADD COLUMN     "rightId" TEXT NOT NULL,
ADD COLUMN     "rightValue" INTEGER NOT NULL,
ADD COLUMN     "winnerId" TEXT;

-- DropTable
DROP TABLE "Score";

-- DropEnum
DROP TYPE "ResourceType";
