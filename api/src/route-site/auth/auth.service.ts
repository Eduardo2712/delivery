import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync } from "bcrypt";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneOrFail({
            where: {
                email,
                use_active: true
            },
            relations: ["picture"]
        });

        if (user && compareSync(password, user.password)) {
            return user;
        }

        return null;
    }

    async login(user: UserEntity): Promise<{
        token: string;
        user: UserEntity;
    }> {
        const payload = {
            sub: user.id,
            email: user.email
        };

        return {
            token: this.jwtService.sign(payload),
            user
        };
    }

    async register(user: CreateUserDto): Promise<UserEntity> {
        return await "make";
    }
}
