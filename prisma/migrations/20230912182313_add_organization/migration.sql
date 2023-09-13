/*
  Warnings:

  - You are about to drop the `Clubs` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Events" ADD COLUMN "organization" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Clubs";
