/*
  Warnings:

  - Made the column `detailCar` on table `cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carType` on table `cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `engine` on table `cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `cars` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `cars` MODIFY `image` VARCHAR(255) NULL,
    MODIFY `detailCar` VARCHAR(255) NOT NULL,
    MODIFY `carType` VARCHAR(255) NOT NULL,
    MODIFY `engine` VARCHAR(255) NOT NULL,
    MODIFY `status` VARCHAR(100) NOT NULL;
