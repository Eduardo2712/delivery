import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserPayloadType, UserTokenType, UserType } from "src/types/user.types";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

    async login(user: UserType): Promise<UserTokenType & { user: UserType }> {
        const payload: UserPayloadType = {
            sub: user.id,
            email: user.email,
            use_name: user.use_name
        };

        return {
            access_token: this.jwtService.sign(payload),
            user
        };
    }

    async validateUser(email: string, password: string): Promise<UserType> {
        const user = await this.usersService.findByEmail(email);

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
