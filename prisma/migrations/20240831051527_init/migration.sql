/*
  Warnings:

  - You are about to drop the column `time` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `closingTime` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryCharge` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingTime` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "time",
ADD COLUMN     "closingTime" TEXT NOT NULL,
ADD COLUMN     "deliveryCharge" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "openingTime" TEXT NOT NULL;
