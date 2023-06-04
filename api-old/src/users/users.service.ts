import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";
import { User } from "./entities/user.entity";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) {}

    async create(create_user_dto: CreateUserDto) {
        const email_unique = await this.userModel.findOne({
            where: {
                email: create_user_dto.email
            },
            raw: true,
            nest: true
        });

        if (email_unique) {
            throw new HttpException("This email address is already in use", HttpStatus.BAD_REQUEST);
        }

        const cpf_unique = await this.userModel.findOne({
            where: {
                use_cpf: create_user_dto.use_cpf
            },
            raw: true,
            nest: true
        });

        if (cpf_unique) {
            throw new HttpException("This cpf is already in use", HttpStatus.BAD_REQUEST);
        }

        const salt_rounds = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(create_user_dto.password, salt_rounds);

        const user = await this.userModel.create({
            password: hash,
            email: create_user_dto.email,
            use_date_birth: new Date(create_user_dto.use_date_birth.toString()),
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

    async findByEmail(email: string) {
        const user = await this.userModel.findOne<User>({
            where: {
                email
            },
            raw: true
        });

        return user;
    }
}
