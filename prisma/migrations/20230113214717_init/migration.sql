/*
  Warnings:

  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `closestPlace` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `cusomerName` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhone` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `productID` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `orders` table. All the data in the column will be lost.
  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productName]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idUser` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderAddress` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderTotal` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productDescription` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productImage` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productPrice` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` DROP PRIMARY KEY,
    DROP COLUMN `closestPlace`,
    DROP COLUMN `cusomerName`,
    DROP COLUMN `customerPhone`,
    DROP COLUMN `district`,
    DROP COLUMN `id`,
    DROP COLUMN `productID`,
    DROP COLUMN `province`,
    DROP COLUMN `quantity`,
    DROP COLUMN `status`,
    ADD COLUMN `idUser` INTEGER NOT NULL,
    ADD COLUMN `orderAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `orderDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `orderStatus` ENUM('NEW', 'ACCEPTED', 'CANCELLED') NOT NULL DEFAULT 'NEW',
    ADD COLUMN `orderTotal` INTEGER NOT NULL,
    ADD PRIMARY KEY (`orderId`);

-- AlterTable
ALTER TABLE `products` DROP PRIMARY KEY,
    DROP COLUMN `description`,
    DROP COLUMN `id`,
    DROP COLUMN `image`,
    DROP COLUMN `name`,
    DROP COLUMN `price`,
    ADD COLUMN `productDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `productId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `productImage` VARCHAR(191) NOT NULL,
    ADD COLUMN `productName` VARCHAR(191) NOT NULL,
    ADD COLUMN `productPrice` INTEGER NOT NULL,
    ADD PRIMARY KEY (`productId`);

-- DropTable
DROP TABLE `admin`;

-- CreateTable
CREATE TABLE `users` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_userName_key`(`userName`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `categoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `categories_categoryName_key`(`categoryName`),
    PRIMARY KEY (`categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories_products` (
    `pcId` INTEGER NOT NULL AUTO_INCREMENT,
    `idCategory` INTEGER NOT NULL,
    `idProduct` INTEGER NOT NULL,

    PRIMARY KEY (`pcId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `oiId` INTEGER NOT NULL AUTO_INCREMENT,
    `oiQty` INTEGER NOT NULL,
    `oiPrice` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `orderId` INTEGER NOT NULL,
    `idProduct` INTEGER NOT NULL,

    PRIMARY KEY (`oiId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `products_productName_key` ON `products`(`productName`);

-- AddForeignKey
ALTER TABLE `categories_products` ADD CONSTRAINT `categories_products_idProduct_fkey` FOREIGN KEY (`idProduct`) REFERENCES `products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_products` ADD CONSTRAINT `categories_products_idCategory_fkey` FOREIGN KEY (`idCategory`) REFERENCES `categories`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_idProduct_fkey` FOREIGN KEY (`idProduct`) REFERENCES `products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
