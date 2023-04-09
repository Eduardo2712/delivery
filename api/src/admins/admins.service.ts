import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";

@Injectable()
export class AdminsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(create_admin_dto: CreateAdminDto) {
        const email_unique = await this.prisma.admin.findFirst({
            where: {
                email: create_admin_dto.email
            }
        });

        if (email_unique) {
            throw new HttpException("This email address is already in use", HttpStatus.BAD_REQUEST);
        }

        const cnpj_unique = await this.prisma.admin.findFirst({
            where: {
                adm_cnpj: create_admin_dto.adm_cnpj
            }
        });

        if (cnpj_unique) {
            throw new HttpException("This cpf is already in use", HttpStatus.BAD_REQUEST);
        }

        const salt_rounds = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(create_admin_dto.password, salt_rounds);

        const admin = this.prisma.admin.create({
            data: {
                password: hash,
                email: create_admin_dto.email,
                adm_cnpj: create_admin_dto.adm_cnpj,
                adm_name: create_admin_dto.adm_name,
                adm_phone: create_admin_dto.adm_phone,
                addresses: {
                    create: {
                        usa_cep: create_admin_dto.usa_cep,
                        usa_city: create_admin_dto.usa_city,
                        usa_district: create_admin_dto.usa_district,
                        usa_number: create_admin_dto.usa_number,
                        usa_state: create_admin_dto.usa_state,
                        usa_street: create_admin_dto.usa_street,
                        usa_complement: create_admin_dto.usa_complement
                    }
                }
            }
        });

        return {
            ...admin,
            password: null
        };
    }

    async findAll() {
        return `This action returns all admins`;
    }

    async findOne(id: number) {
        return `This action returns a #${id} admin`;
    }

    async update(id: number, updateAdminDto: UpdateAdminDto) {
        return `This action updates a #${id} admin`;
    }

    async remove(id: number) {
        return `This action removes a #${id} admin`;
    }
}
