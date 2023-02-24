/*
  Warnings:

  - Added the required column `totalPrice` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closestPoint` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_items` ADD COLUMN `discount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `totalPrice` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `closestPoint` VARCHAR(191) NOT NULL,
    ADD COLUMN `district` VARCHAR(191) NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL;
