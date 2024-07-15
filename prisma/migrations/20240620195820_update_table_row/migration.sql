/*
  Warnings:

  - You are about to drop the column `status` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transactionId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "payments_transactionId_key";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
ADD COLUMN     "transactionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "status",
DROP COLUMN "transactionId";

-- CreateIndex
CREATE UNIQUE INDEX "orders_transactionId_key" ON "orders"("transactionId");
