-- CreateTable
CREATE TABLE `user_addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usa_id_user` INTEGER NOT NULL,
    `usa_cep` VARCHAR(255) NOT NULL,
    `usa_street` VARCHAR(255) NOT NULL,
    `usa_number` VARCHAR(255) NOT NULL,
    `usa_district` VARCHAR(255) NOT NULL,
    `usa_complement` VARCHAR(255) NULL,
    `usa_city` VARCHAR(255) NOT NULL,
    `usa_state` VARCHAR(255) NOT NULL,
    `usa_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_addresses_usa_id_user_idx`(`usa_id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ada_id_admin` INTEGER NOT NULL,
    `ada_cep` VARCHAR(255) NOT NULL,
    `ada_street` VARCHAR(255) NOT NULL,
    `ada_number` VARCHAR(255) NOT NULL,
    `ada_district` VARCHAR(255) NOT NULL,
    `ada_complement` VARCHAR(255) NULL,
    `ada_city` VARCHAR(255) NOT NULL,
    `ada_state` VARCHAR(255) NOT NULL,
    `ada_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `admin_addresses_ada_id_admin_idx`(`ada_id_admin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `use_id_photo` INTEGER NULL,
    `use_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `use_phone` VARCHAR(255) NOT NULL,
    `use_cpf` VARCHAR(255) NOT NULL,
    `use_date_birth` DATETIME(3) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `use_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_use_id_photo_idx`(`use_id_photo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adm_id_photo` INTEGER NULL,
    `adm_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `adm_phone` VARCHAR(255) NOT NULL,
    `adm_cnpj` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `adm_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `admin_adm_id_photo_idx`(`adm_id_photo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adp_id_admin` INTEGER NOT NULL,
    `adp_price` DOUBLE NOT NULL,
    `adp_name` VARCHAR(255) NOT NULL,
    `adp_description` VARCHAR(255) NOT NULL,
    `adp_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `admin_products_adp_id_admin_idx`(`adp_id_admin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ads_id_admin` INTEGER NOT NULL,
    `ads_day_week` INTEGER NOT NULL,
    `ads_start` DATETIME(3) NOT NULL,
    `ads_final` DATETIME(3) NOT NULL,
    `ads_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `admin_service_ads_id_admin_idx`(`ads_id_admin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pho_size` INTEGER NOT NULL,
    `pho_name` VARCHAR(255) NOT NULL,
    `pho_delete` BOOLEAN NOT NULL DEFAULT false,
    `pho_path` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
