import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User
    ) {}

    async create(create_user_dto: CreateUserDto) {
        const email_unique = await this.userModel.findOne({
            where: {
                email: create_user_dto.email
            }
        });

        if (email_unique) {
            throw new HttpException("This email address is already in use", HttpStatus.BAD_REQUEST);
        }

        const cpf_unique = await this.userModel.findOne({
            where: {
                use_cpf: create_user_dto.use_cpf
            }
        });

        if (cpf_unique) {
            throw new HttpException("This cpf is already in use", HttpStatus.BAD_REQUEST);
        }

        const salt_rounds = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(create_user_dto.password, salt_rounds);

        const user = await this.userModel.create({
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
        const user = this.userModel.findOne<User>({
            where: {
                email
            },
            raw: true
        });

        return user;
    }
}
