import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AdminsModule } from './admins/admins.module';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10
        }),
        PrismaModule,
        UsersModule,
        AuthModule,
        UsersModule,
        AdminsModule,
        ProductsModule
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
