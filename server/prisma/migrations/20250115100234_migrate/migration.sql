/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Attachment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "fileUrl",
ADD COLUMN     "fileURL" TEXT;
