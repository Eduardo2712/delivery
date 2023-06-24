import { SequelizeOptions } from "sequelize-typescript";
import { Dialect } from "sequelize";
import "dotenv/config";

const databaseConfig: SequelizeOptions = {
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

export default databaseConfig;
