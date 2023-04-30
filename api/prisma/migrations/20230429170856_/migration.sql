/*
  Warnings:

  - Added the required column `pro_id_type` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `pro_id_type` INTEGER NOT NULL;
