-- DropForeignKey
ALTER TABLE `cart_detail` DROP FOREIGN KEY `cart_detail_carId_fkey`;

-- DropForeignKey
ALTER TABLE `rental_detail` DROP FOREIGN KEY `rental_detail_carId_fkey`;

-- DropIndex
DROP INDEX `cart_detail_carId_fkey` ON `cart_detail`;

-- DropIndex
DROP INDEX `rental_detail_carId_fkey` ON `rental_detail`;

-- AlterTable
ALTER TABLE `cart_detail` ADD COLUMN `toolId` INTEGER NULL,
    MODIFY `carId` INTEGER NULL;

-- AlterTable
ALTER TABLE `rental_detail` ADD COLUMN `toolId` INTEGER NULL,
    MODIFY `carId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `rental_detail` ADD CONSTRAINT `rental_detail_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `cars`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rental_detail` ADD CONSTRAINT `rental_detail_toolId_fkey` FOREIGN KEY (`toolId`) REFERENCES `cartool`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_detail` ADD CONSTRAINT `cart_detail_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `cars`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_detail` ADD CONSTRAINT `cart_detail_toolId_fkey` FOREIGN KEY (`toolId`) REFERENCES `cartool`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
