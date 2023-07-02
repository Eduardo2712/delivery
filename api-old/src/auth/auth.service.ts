import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AdminsService } from "src/admins/admins.service";
import { AdminPayloadType, AdminTokenType, AdminType } from "src/types/admin.type";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly adminsService: AdminsService) {}

    async login(user: AdminType): Promise<AdminTokenType & { user: AdminType }> {
        const payload: AdminPayloadType = {
            sub: user.id,
            email: user.email,
            adm_name: user.adm_name
        };

        return {
            access_token: this.jwtService.sign(payload),
            user
        };
    }

    async validateUser(email: string, password: string): Promise<AdminType> {
        const user = await this.adminsService.findByEmail(email);

        if (user) {
            const is_password_valid = await bcrypt.compare(password, user.password);

            if (is_password_valid) {
                return {
                    ...user,
                    password: undefined
                };
            }
        }

        throw new UnauthorizedException("Email address or password provided is incorrect.");
    }
}
