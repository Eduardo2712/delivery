import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AdminModule } from "../admin/admin.module";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot(),
        AdminModule,
        PassportModule,
        JwtModule.register({
            privateKey: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: "1d"
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
