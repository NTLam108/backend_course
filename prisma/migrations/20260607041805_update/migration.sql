/*
  Warnings:

  - You are about to drop the column `toolId` on the `cart_detail` table. All the data in the column will be lost.
  - You are about to drop the column `toolId` on the `rental_detail` table. All the data in the column will be lost.
  - Made the column `carId` on table `cart_detail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carId` on table `rental_detail` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `cart_detail` DROP FOREIGN KEY `cart_detail_carId_fkey`;

-- DropForeignKey
ALTER TABLE `cart_detail` DROP FOREIGN KEY `cart_detail_toolId_fkey`;

-- DropForeignKey
ALTER TABLE `rental_detail` DROP FOREIGN KEY `rental_detail_carId_fkey`;

-- DropForeignKey
ALTER TABLE `rental_detail` DROP FOREIGN KEY `rental_detail_toolId_fkey`;

-- DropIndex
DROP INDEX `cart_detail_carId_fkey` ON `cart_detail`;

-- DropIndex
DROP INDEX `cart_detail_toolId_fkey` ON `cart_detail`;

-- DropIndex
DROP INDEX `rental_detail_carId_fkey` ON `rental_detail`;

-- DropIndex
DROP INDEX `rental_detail_toolId_fkey` ON `rental_detail`;

-- AlterTable
ALTER TABLE `cart_detail` DROP COLUMN `toolId`,
    MODIFY `carId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rental_detail` DROP COLUMN `toolId`,
    MODIFY `carId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `rental_detail` ADD CONSTRAINT `rental_detail_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_detail` ADD CONSTRAINT `cart_detail_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
