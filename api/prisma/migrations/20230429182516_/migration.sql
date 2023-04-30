-- AlterTable
ALTER TABLE `products` ADD COLUMN `pro_id_photo` INTEGER NULL;

-- CreateIndex
CREATE INDEX `products_pro_id_photo_idx` ON `products`(`pro_id_photo`);
