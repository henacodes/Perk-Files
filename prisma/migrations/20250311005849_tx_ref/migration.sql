/*
  Warnings:

  - You are about to drop the column `trxRef` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `txRef` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "trxRef",
ADD COLUMN     "txRef" TEXT NOT NULL;
