/*
  Warnings:

  - Added the required column `status` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trxRef` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "trxRef" TEXT NOT NULL;
