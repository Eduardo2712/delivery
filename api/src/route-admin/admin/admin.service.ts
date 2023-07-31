import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/entities/admin.entity";
import { ILike, Repository } from "typeorm";
import { checkUnique } from "src/helpers/service.helpers";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>
    ) {}

    async create(createAdminDto: CreateAdminDto) {
        const aux = await checkUnique(
            this.adminRepository,
            {
                adm_name: createAdminDto.adm_name
            },
            "email"
        );

        if (aux) {
            throw new Error(aux);
        }

        const admin = this.adminRepository.create({
            ...createAdminDto,
            adm_delete: false
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
