/*
  Warnings:

  - Made the column `limit` on table `Coupon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Coupon" ALTER COLUMN "limit" SET NOT NULL,
ALTER COLUMN "limit" SET DEFAULT 0;
