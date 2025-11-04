/*
  Warnings:

  - You are about to drop the column `image` on the `cars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cars` DROP COLUMN `image`,
    ADD COLUMN `carImage` VARCHAR(255) NULL;
