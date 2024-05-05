import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync } from "bcrypt";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { ServiceHelpers } from "src/helpers/service.helper";

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

    async register(create_user_dto: CreateUserDto): Promise<UserEntity> {
        const error = await ServiceHelpers.checkUnique(this.userRepository, { use_active: true, email: create_user_dto.email }, "email");

        if (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }

        if (create_user_dto.step === 2) {
            const obj = this.userRepository.create({
                use_name: create_user_dto.use_name,
                use_cpf: create_user_dto.use_cpf,
                use_phone: create_user_dto.use_phone,
                email: create_user_dto.email,
                addresses: [
                    {
                        usa_cep: create_user_dto.usa_cep,
                        usa_street: create_user_dto.usa_street,
                        usa_number: create_user_dto.usa_number,
                        usa_neighborhood: create_user_dto.usa_neighborhood,
                        usa_complement: create_user_dto.usa_complement,
                        usa_city: create_user_dto.usa_city,
                        usa_state: create_user_dto.usa_state
                    }
                ]
            });

            await this.userRepository.save(obj);

            return obj;
        }
    }
}
