import { Sequelize } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";
import { databaseConfig } from "./database.config";

export const SEQUELIZE = "SEQUELIZE";
export const DEVELOPMENT = "development";
export const TEST = "test";
export const PRODUCTION = "production";

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config: unknown;
            switch (process.env.NODE_ENV as string) {
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
            sequelize.addModels([User]);
            // await sequelize.sync();
            return sequelize;
        }
    }
];
