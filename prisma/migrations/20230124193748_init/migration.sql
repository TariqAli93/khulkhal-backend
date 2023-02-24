/*
  Warnings:

  - The primary key for the `order_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `oiId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `oiPrice` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `oiQty` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `orderAddress` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderDate` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderTotal` on the `orders` table. All the data in the column will be lost.
  - Added the required column `orderItemId` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_idProduct_fkey`;

-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_idUser_fkey`;

-- AlterTable
ALTER TABLE `order_items` DROP PRIMARY KEY,
    DROP COLUMN `oiId`,
    DROP COLUMN `oiPrice`,
    DROP COLUMN `oiQty`,
    DROP COLUMN `orderId`,
    ADD COLUMN `idOrder` INTEGER NULL,
    ADD COLUMN `orderItemId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    MODIFY `idProduct` INTEGER NULL,
    ADD PRIMARY KEY (`orderItemId`);

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `orderAddress`,
    DROP COLUMN `orderDate`,
    DROP COLUMN `orderTotal`,
    ADD COLUMN `orderPrice` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    MODIFY `idUser` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `users`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_idOrder_fkey` FOREIGN KEY (`idOrder`) REFERENCES `orders`(`orderId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_idProduct_fkey` FOREIGN KEY (`idProduct`) REFERENCES `products`(`productId`) ON DELETE SET NULL ON UPDATE CASCADE;
