import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD, RouterModule } from "@nestjs/core";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { RouteAdmin } from "./route-admin/route-admin.route";
import { RouteAdminModule } from "./route-admin/route-admin.module";
import { RouteSite } from "./route-site/route-site.route";
import { RouteSiteModule } from "./route-site/route-site.module";
import { AlsModule } from "./als/als.module";
import { AlsMiddleware } from "./als/als.middleware";

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
                migrations: ["dist/migrations/*.js"],
                migrationsTableName: "migrations_typeorm",
                synchronize: true,
                autoLoadEntities: true
            }),
            inject: [ConfigService]
        }),
        RouteAdminModule,
        RouteSiteModule,
        RouterModule.register([...RouteAdmin, ...RouteSite]),
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60,
                    limit: 10
                }
            ]
        }),
        AlsModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AlsMiddleware).forRoutes("*");
    }
}
