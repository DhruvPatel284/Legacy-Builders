/*
  Warnings:

  - You are about to drop the column `event_id` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_event_id_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "event_id";
