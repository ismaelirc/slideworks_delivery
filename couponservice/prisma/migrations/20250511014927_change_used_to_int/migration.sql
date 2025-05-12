/*
  Warnings:

  - The `used` column on the `Coupon` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "used",
ADD COLUMN     "used" INTEGER NOT NULL DEFAULT 0;
