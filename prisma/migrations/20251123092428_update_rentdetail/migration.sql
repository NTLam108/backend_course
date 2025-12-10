-- CreateTable
CREATE TABLE `Rental_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pickupdate` DATETIME(3) NOT NULL,
    `dropoffdate` DATETIME(3) NOT NULL,
    `pickupplace` VARCHAR(255) NOT NULL,
    `dropoffplace` VARCHAR(255) NOT NULL,
    `userId` INTEGER NOT NULL,
    `carId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rental_detail` ADD CONSTRAINT `Rental_detail_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rental_detail` ADD CONSTRAINT `Rental_detail_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
