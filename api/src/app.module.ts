import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entities/user.entity";
import { AuthModule } from "./auth/auth.module";
import { Dialect } from "sequelize";
import { ProductsModule } from "./products/products.module";
import { File } from "./files/entities/file.entity";
import { Product } from "./products/entities/product.entity";
import { ProductFile } from "./product_files/entities/product_file.entity";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: process.env.DB_DIALECT as Dialect,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            models: [User, File, Product, ProductFile],
            autoLoadModels: true,
            synchronize: true
        }),
        UsersModule,
        AuthModule,
        ProductsModule
    ],

    controllers: [AppController],

    providers: [AppService]
})
export class AppModule {}
