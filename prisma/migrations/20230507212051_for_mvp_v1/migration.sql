/*
  Warnings:

  - Added the required column `event_last_modified` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_post_date` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ref_id` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "event_last_modified" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "event_post_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ref_id" INTEGER NOT NULL,
ALTER COLUMN "location" SET DATA TYPE TEXT;
