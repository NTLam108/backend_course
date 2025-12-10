/*
  Warnings:

  - You are about to drop the column `toolId` on the `cart_detail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart_detail` DROP FOREIGN KEY `cart_detail_toolId_fkey`;

-- DropIndex
DROP INDEX `cart_detail_toolId_fkey` ON `cart_detail`;

-- AlterTable
ALTER TABLE `cart_detail` DROP COLUMN `toolId`;
