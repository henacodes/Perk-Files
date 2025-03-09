/*
  Warnings:

  - You are about to drop the column `userId` on the `digital_file` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `digital_file` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "digital_file" DROP CONSTRAINT "digital_file_userId_fkey";

-- AlterTable
ALTER TABLE "digital_file" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "digital_file" ADD CONSTRAINT "digital_file_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
