-- CreateEnum
CREATE TYPE "Special" AS ENUM ('Tea', 'Coffe');

-- CreateEnum
CREATE TYPE "Package" AS ENUM ('Box', 'Bag', 'Tin');

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "size" TEXT[],
    "discount" DOUBLE PRECISION,
    "buyPackage" "Package" NOT NULL DEFAULT 'Bag',
    "packageDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "sellCount" INTEGER NOT NULL DEFAULT 0,
    "isSpecial" "Special" NOT NULL DEFAULT 'Tea',
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categoryies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
