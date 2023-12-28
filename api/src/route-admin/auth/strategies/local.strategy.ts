import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AdminEntity } from "src/entities/admin.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: "email"
        });
    }

    async validate(email: string, pass: string): Promise<AdminEntity> {
        const admin = await this.authService.validateAdmin(email, pass);

        if (!admin) {
            throw new UnauthorizedException("Email and/or password are invalid");
        }

        return admin;
    }
}
