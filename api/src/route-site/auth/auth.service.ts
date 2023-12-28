import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync } from "bcrypt";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.userRepository.findOneOrFail({
            where: {
                email,
                use_active: true
            }
        });

        const is_password_valid = compareSync(pass, user.password);

        if (!is_password_valid) {
            return null;
        }

        return user;
    }

    async login(email: string, pass: string) {
        const user = await this.userRepository.findOne({
            where: {
                email,
                use_active: true
            },
            relations: {
                picture: true
            }
        });

        if (!user) {
            throw new NotFoundException("Email and/or password invalid!");
        }

        const is_password_valid = compareSync(pass, user.password);

        if (!is_password_valid) {
            throw new NotFoundException("Email and/or password invalid!");
        }

        const payload = { sub: user.id, email: user.email };

        return {
            token: await this.jwtService.signAsync(payload),
            user
        };
    }
}
