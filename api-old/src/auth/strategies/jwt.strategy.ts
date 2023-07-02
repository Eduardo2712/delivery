import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminFromJwtType, AdminPayloadType } from "src/types/admin.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: AdminPayloadType): Promise<AdminFromJwtType> {
        return {
            id: payload.sub,
            email: payload.email,
            adm_name: payload.adm_name
        };
    }
}
