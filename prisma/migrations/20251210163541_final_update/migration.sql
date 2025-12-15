/*
  Warnings:

  - You are about to drop the column `dropoffdate` on the `rental_detail` table. All the data in the column will be lost.
  - You are about to drop the column `dropoffplace` on the `rental_detail` table. All the data in the column will be lost.
  - You are about to drop the column `pickupdate` on the `rental_detail` table. All the data in the column will be lost.
  - You are about to drop the column `pickupplace` on the `rental_detail` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `rental_detail` table. All the data in the column will be lost.
  - Added the required column `price` to the `Rental_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Rental_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentalId` to the `Rental_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoffdate` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentRef` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupdate` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupplace` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renterAddress` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renterName` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renterPhone` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `rentals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `rental_detail` DROP FOREIGN KEY `Rental_detail_userId_fkey`;

-- DropIndex
DROP INDEX `Rental_detail_userId_fkey` ON `rental_detail`;

-- AlterTable
ALTER TABLE `rental_detail` DROP COLUMN `dropoffdate`,
    DROP COLUMN `dropoffplace`,
    DROP COLUMN `pickupdate`,
    DROP COLUMN `pickupplace`,
    DROP COLUMN `userId`,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `rentalId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rentals` ADD COLUMN `dropoffdate` DATETIME(3) NOT NULL,
    ADD COLUMN `paymentMethod` VARCHAR(255) NOT NULL,
    ADD COLUMN `paymentRef` VARCHAR(255) NOT NULL,
    ADD COLUMN `paymentStatus` VARCHAR(255) NOT NULL,
    ADD COLUMN `pickupdate` DATETIME(3) NOT NULL,
    ADD COLUMN `pickupplace` VARCHAR(255) NOT NULL,
    ADD COLUMN `renterAddress` VARCHAR(255) NOT NULL,
    ADD COLUMN `renterName` VARCHAR(255) NOT NULL,
    ADD COLUMN `renterPhone` VARCHAR(255) NOT NULL,
    ADD COLUMN `status` VARCHAR(255) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Rental_detail` ADD CONSTRAINT `Rental_detail_rentalId_fkey` FOREIGN KEY (`rentalId`) REFERENCES `rentals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rentals` ADD CONSTRAINT `rentals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
