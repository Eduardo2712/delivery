import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD, RouterModule } from "@nestjs/core";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { RouteAdmin } from "./route-admin/route-admin.route";
import { RouteAdminModule } from "./route-admin/route-admin.module";

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
        RouterModule.register([...RouteAdmin]),
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60,
                    limit: 10
                }
            ]
        })
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}
