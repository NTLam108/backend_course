-- DropForeignKey
ALTER TABLE `rental_detail` DROP FOREIGN KEY `Rental_detail_carId_fkey`;

-- DropForeignKey
ALTER TABLE `rental_detail` DROP FOREIGN KEY `Rental_detail_rentalId_fkey`;

-- AddForeignKey
ALTER TABLE `rental_detail` ADD CONSTRAINT `rental_detail_rentalId_fkey` FOREIGN KEY (`rentalId`) REFERENCES `rentals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rental_detail` ADD CONSTRAINT `rental_detail_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `session` RENAME INDEX `Session_sid_key` TO `session_sid_key`;
