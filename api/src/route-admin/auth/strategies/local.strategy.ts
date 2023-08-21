import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Messages } from "src/helpers/message.helpers";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: "email"
        });
    }

    async validate(email: string, pass: string): Promise<any> {
        const admin = await this.authService.validateAdmin(email, pass);

        if (!admin) {
            throw new UnauthorizedException(Messages.PASSWORD_OR_EMAIL_INVALID);
        }

        return admin;
    }
}
