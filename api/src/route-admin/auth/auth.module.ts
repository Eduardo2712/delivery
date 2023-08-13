import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AdminModule } from "../admin/admin.module";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/entities/admin.entity";

@Module({
    imports: [
        ConfigModule.forRoot(),
        AdminModule,
        PassportModule,
        JwtModule.register({
            global: true,
            privateKey: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: "30d"
            }
        }),
        TypeOrmModule.forFeature([AdminEntity])
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
