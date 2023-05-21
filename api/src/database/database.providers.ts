import { Sequelize } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";
import { databaseConfig } from "./database.config";
import { Product } from "src/products/entities/product.entity";
import { Photo } from "src/photos/entities/photo.entity";

export const SEQUELIZE = "SEQUELIZE";
export const DEVELOPMENT = "development";
export const TEST = "test";
export const PRODUCTION = "production";

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config: unknown;
            switch (process.env.NODE_ENV) {
                case DEVELOPMENT:
                    config = databaseConfig.development;
                    break;
                case TEST:
                    config = databaseConfig.test;
                    break;
                case PRODUCTION:
                    config = databaseConfig.production;
                    break;
                default:
                    config = databaseConfig.development;
            }

            const sequelize = new Sequelize(config);
            sequelize.addModels([User, Product, Photo]);
            return sequelize;
        }
    }
];
