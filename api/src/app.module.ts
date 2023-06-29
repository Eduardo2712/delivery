import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./products/products.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import "dotenv/config";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: ["dist/**/*.entity.js"],
            synchronize: true,
            autoLoadEntities: true
        }),
        UsersModule,
        AuthModule,
        ProductsModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
