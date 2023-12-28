import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./route-admin/auth/guard/auth.guard";
import { RouteAdminModule } from "./route-admin/route-admin.module";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { RouteSiteModule } from "./route-site/route-site.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: "mysql",
                host: configService.get("DB_HOST"),
                port: parseInt(configService.get("DB_PORT")),
                username: configService.get("DB_USER"),
                password: configService.get("DB_PASS"),
                database: configService.get("DB_NAME"),
                entities: ["dist/**/*.entity.js"],
                synchronize: true,
                autoLoadEntities: true
            }),
            inject: [ConfigService]
        }),
        RouteAdminModule,
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60,
                    limit: 10
                }
            ]
        }),
        RouteSiteModule
    ],
    providers: [
        JwtService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}
