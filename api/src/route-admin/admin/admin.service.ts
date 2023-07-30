import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/entities/admin.entity";
import { ILike, Repository } from "typeorm";
import bcrypt from "bcrypt";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>
    ) {}

    async create(createAdminDto: CreateAdminDto) {
        const hash_password = bcrypt.hashSync(createAdminDto.password, 10);

        const admin = this.adminRepository.create({
            ...createAdminDto,
            adm_delete: false,
            password: hash_password
        });

        await this.adminRepository.save(admin);

        return { ...admin, password: undefined };
    }

    async findAll(search: string, rows_per_page: number, page: number) {
        return await this.adminRepository.find({
            where: {
                adm_delete: false,
                adm_name: ILike(`%${search}%`)
            },
            order: {
                adm_name: "ASC"
            },
            take: rows_per_page,
            skip: rows_per_page * (page - 1)
        });
    }

    async update(id: number, updateAdminDto: UpdateAdminDto) {
        const admin = await this.adminRepository.findOneOrFail({ where: { id } });

        this.adminRepository.merge(admin, updateAdminDto);
        return await this.adminRepository.save(admin);
    }

    async remove(id: number) {
        const obj = await this.adminRepository.findOneOrFail({ where: { id } });

        obj.adm_delete = true;

        await this.adminRepository.save(obj);
    }
}
