/*
  Warnings:

  - You are about to drop the column `adm_cnpj` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `adp_delete` on the `admin_products` table. All the data in the column will be lost.
  - You are about to drop the column `adp_description` on the `admin_products` table. All the data in the column will be lost.
  - You are about to drop the column `adp_id_admin` on the `admin_products` table. All the data in the column will be lost.
  - You are about to drop the column `adp_name` on the `admin_products` table. All the data in the column will be lost.
  - You are about to drop the column `adp_price` on the `admin_products` table. All the data in the column will be lost.
  - You are about to drop the column `ads_day_week` on the `admin_service` table. All the data in the column will be lost.
  - You are about to drop the column `ads_delete` on the `admin_service` table. All the data in the column will be lost.
  - You are about to drop the column `ads_final` on the `admin_service` table. All the data in the column will be lost.
  - You are about to drop the column `ads_id_admin` on the `admin_service` table. All the data in the column will be lost.
  - You are about to drop the column `ads_start` on the `admin_service` table. All the data in the column will be lost.
  - Added the required column `pro_description` to the `admin_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pro_name` to the `admin_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pro_price` to the `admin_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ser_day_week` to the `admin_service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ser_final` to the `admin_service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ser_start` to the `admin_service` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `admin_products_adp_id_admin_idx` ON `admin_products`;

-- DropIndex
DROP INDEX `admin_service_ads_id_admin_idx` ON `admin_service`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `adm_cnpj`;

-- AlterTable
ALTER TABLE `admin_products` DROP COLUMN `adp_delete`,
    DROP COLUMN `adp_description`,
    DROP COLUMN `adp_id_admin`,
    DROP COLUMN `adp_name`,
    DROP COLUMN `adp_price`,
    ADD COLUMN `pro_delete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `pro_description` VARCHAR(255) NOT NULL,
    ADD COLUMN `pro_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `pro_price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `admin_service` DROP COLUMN `ads_day_week`,
    DROP COLUMN `ads_delete`,
    DROP COLUMN `ads_final`,
    DROP COLUMN `ads_id_admin`,
    DROP COLUMN `ads_start`,
    ADD COLUMN `ser_day_week` INTEGER NOT NULL,
    ADD COLUMN `ser_delete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ser_final` DATETIME(3) NOT NULL,
    ADD COLUMN `ser_start` DATETIME(3) NOT NULL;
