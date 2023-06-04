import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UnauthorizedError } from "./errors/unauthorized.error";
import { UsersService } from "../users/users.service";
import { UserPayload } from "./models/UserPayload";
import { UserToken } from "./models/UserToken";
import { User } from "src/types/user.type";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

    async login(user: User): Promise<UserToken & { user: User }> {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            use_name: user.use_name
        };

        return {
            access_token: this.jwtService.sign(payload),
            user
        };
    }

    async validateUser(email: string, password: string): Promise<User> {
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

        throw new UnauthorizedError("Email address or password provided is incorrect.");
    }
}
