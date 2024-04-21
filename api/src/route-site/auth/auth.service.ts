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
        const obj = this.userRepository.create({
            use_name: user.use_name,
            use_cpf: user.use_cpf,
            use_phone: user.use_phone,
            email: user.email,
            addresses: [
                {
                    usa_cep: user.usa_cep,
                    usa_street: user.usa_street,
                    usa_number: user.usa_number,
                    usa_neighborhood: user.usa_neighborhood,
                    usa_complement: user.usa_complement,
                    usa_city: user.usa_city,
                    usa_state: user.usa_state
                }
            ]
        });

        await this.userRepository.save(obj);

        return obj;
    }
}
