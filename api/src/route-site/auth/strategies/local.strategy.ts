import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: "email"
        });
    }

    async validate(email: string, pass: string): Promise<any> {
        const user = await this.authService.validateUser(email, pass);

        if (!user) {
            throw new UnauthorizedException("Email and/or password are invalid");
        }

        return user;
    }
}
