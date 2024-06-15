/*
  Warnings:

  - The values [Coffe] on the enum `Special` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Special_new" AS ENUM ('Tea', 'Coffee');
ALTER TABLE "products" ALTER COLUMN "isSpecial" DROP DEFAULT;
ALTER TABLE "products" ALTER COLUMN "isSpecial" TYPE "Special_new" USING ("isSpecial"::text::"Special_new");
ALTER TYPE "Special" RENAME TO "Special_old";
ALTER TYPE "Special_new" RENAME TO "Special";
DROP TYPE "Special_old";
ALTER TABLE "products" ALTER COLUMN "isSpecial" SET DEFAULT 'Tea';
COMMIT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "discountPrice" DOUBLE PRECISION;
