/*
  Warnings:

  - A unique constraint covering the columns `[txRef]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "transaction_txRef_key" ON "transaction"("txRef");
