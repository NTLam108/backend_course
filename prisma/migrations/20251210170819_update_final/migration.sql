/*
  Warnings:

  - You are about to alter the column `paymentRef` on the `rentals` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `status` on the `rentals` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `rentals` MODIFY `paymentRef` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING';
