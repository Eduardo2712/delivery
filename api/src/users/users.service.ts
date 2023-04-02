import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(create_user_dto: CreateUserDto) {
        const email_unique = await this.prisma.user.findFirst({
            where: {
                email: create_user_dto.email
            }
        });

        if (email_unique) {
            throw new HttpException("This email address is already in use", HttpStatus.BAD_REQUEST);
        }

        const cpf_unique = await this.prisma.user.findFirst({
            where: {
                use_cpf: create_user_dto.use_cpf
            }
        });

        if (cpf_unique) {
            throw new HttpException("This cpf is already in use", HttpStatus.BAD_REQUEST);
        }

        const salt_rounds = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(create_user_dto.password, salt_rounds);

        const user = this.prisma.user.create({
            data: {
                password: hash,
                email: create_user_dto.email,
                use_cpf: create_user_dto.use_cpf,
                use_date_birth: new Date(create_user_dto.use_date_birth),
                use_name: create_user_dto.use_name,
                use_phone: create_user_dto.use_phone,
                addresses: {
                    create: {
                        usa_cep: create_user_dto.usa_cep,
                        usa_city: create_user_dto.usa_city,
                        usa_district: create_user_dto.usa_district,
                        usa_number: create_user_dto.usa_number,
                        usa_state: create_user_dto.usa_state,
                        usa_street: create_user_dto.usa_street,
                        usa_complement: create_user_dto.usa_complement
                    }
                }
            }
        });

        return {
            ...user,
            password: null
        };
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findFirst({
            where: { email },
            include: {
                photo: true
            }
        });
    }

    async findAll() {
        return `This action returns all users`;
    }

    async findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    async remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
