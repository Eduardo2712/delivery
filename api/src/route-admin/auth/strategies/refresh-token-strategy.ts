import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "admin-refresh") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField("refresh"),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: { sub: string; email: string }) {
        return { id: payload.sub, email: payload.email };
    }
}
