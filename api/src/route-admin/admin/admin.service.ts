import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/entities/admin.entity";
import { FindOneOptions, ILike, Repository } from "typeorm";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>
    ) {}

    async create(createAdminDto: CreateAdminDto) {
        const admin = this.adminRepository.create(createAdminDto);
        return await this.adminRepository.save(admin);
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

    async findOneOrFail(options?: FindOneOptions<AdminEntity>) {
        try {
            return await this.adminRepository.findOneOrFail(options);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async update(id: number, updateAdminDto: UpdateAdminDto) {
        const admin = await this.findOneOrFail({ where: { id } });
        this.adminRepository.merge(admin, updateAdminDto);
        return await this.adminRepository.save(admin);
    }

    async remove(id: number) {
        await this.adminRepository.findOneOrFail({ where: { id } });
        this.adminRepository.softDelete({ id });
    }
}
