import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./products/products.module";
import databaseConfig from "./database/database.config";

@Module({
    imports: [
        SequelizeModule.forRoot({
            ...databaseConfig,
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
