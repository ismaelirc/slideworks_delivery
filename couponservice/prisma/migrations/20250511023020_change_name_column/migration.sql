/*
  Warnings:

  - You are about to drop the column `productId` on the `Coupon` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "productId",
ADD COLUMN     "product_id" UUID NOT NULL;
