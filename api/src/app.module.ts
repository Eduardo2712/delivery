import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./route-admin/auth/guard/auth.guard";
import { RouteAdminModule } from "./route-admin/route-admin.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
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
        } as TypeOrmModuleOptions),
        RouteAdminModule
    ],
    providers: [
        JwtService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
