import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { UsersModule } from "./users/users.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ProductsModule } from "./products/products.module";
import { PhotosModule } from "./photos/photos.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/entities/user.entity";

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 50
        }),
        UsersModule,
        AuthModule,
        UsersModule,
        ProductsModule,
        PhotosModule,
        SequelizeModule.forRoot({
            dialect: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "delivery",
            models: [User]
        })
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}
