/*
  Warnings:

  - You are about to drop the `CouponProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CouponProduct" DROP CONSTRAINT "CouponProduct_couponId_fkey";

-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "productId" UUID NOT NULL;

-- DropTable
DROP TABLE "CouponProduct";
