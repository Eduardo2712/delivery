/*
  Warnings:

  - You are about to drop the `admin_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `admin_products`;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pro_price` DOUBLE NOT NULL,
    `pro_name` VARCHAR(255) NOT NULL,
    `pro_description` VARCHAR(255) NOT NULL,
    `pro_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
