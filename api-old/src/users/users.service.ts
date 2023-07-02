import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";
import * as bcrypt from "bcrypt";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    create(create_user_dto: CreateUserDto) {
        const email_unique = this.usersRepository.findOne({
            where: {
                email: create_user_dto.email
            }
        });

        if (email_unique) {
            throw new HttpException("This email address is already in use", HttpStatus.BAD_REQUEST);
        }

        const cpf_unique = this.usersRepository.findOne({
            where: {
                use_cpf: create_user_dto.use_cpf
            }
        });

        if (cpf_unique) {
            throw new HttpException("This cpf is already in use", HttpStatus.BAD_REQUEST);
        }

        const salt_rounds = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(create_user_dto.password, salt_rounds);

        const user = this.usersRepository.create({
            password: hash,
            email: create_user_dto.email,
            use_date_birth: create_user_dto.use_date_birth,
            use_name: create_user_dto.use_name,
            use_phone: create_user_dto.use_phone,
            use_cpf: create_user_dto.use_cpf,
            use_delete: false
        });

        return {
            ...user,
            password: null
        };
    }

    findByEmail(email: string) {
        const user = this.usersRepository.findOne({
            where: {
                email
            }
        });

        return user;
    }
}
