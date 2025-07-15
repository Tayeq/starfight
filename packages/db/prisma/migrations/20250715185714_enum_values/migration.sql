/*
  Warnings:

  - The values [person,starship] on the enum `ResourceType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ResourceType_new" AS ENUM ('PERSON', 'STARSHIP');
ALTER TABLE "Game" ALTER COLUMN "resourceType" TYPE "ResourceType_new" USING ("resourceType"::text::"ResourceType_new");
ALTER TYPE "ResourceType" RENAME TO "ResourceType_old";
ALTER TYPE "ResourceType_new" RENAME TO "ResourceType";
DROP TYPE "ResourceType_old";
COMMIT;
