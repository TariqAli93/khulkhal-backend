-- AlterTable
ALTER TABLE `orders` MODIFY `orderStatus` ENUM('NEW', 'ACCEPTED', 'CANCELLED', 'PENDING', 'DELIVERED') NOT NULL DEFAULT 'NEW';
