import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/entities/admin.entity";
import { RefreshJwtStrategy } from "./strategies/refresh-token-strategy";

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: "1h"
            }
        }),
        TypeOrmModule.forFeature([AdminEntity])
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy]
})
export class AuthModule {}
