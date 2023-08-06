import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/entities/admin.entity";
import { ILike, Repository } from "typeorm";
import { checkUnique } from "src/helpers/service.helpers";
import { compareSync } from "bcrypt";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>
    ) {}

    async create(createAdminDto: CreateAdminDto) {
        const error = await checkUnique(this.adminRepository, { adm_name: createAdminDto.adm_name, adm_active: true }, "email");

        if (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }

        const admin = this.adminRepository.create({
            ...createAdminDto,
            adm_active: true
        });

        await this.adminRepository.save(admin);

        return null;
    }

    async findAll(search: string, rows_per_page: number, page: number) {
        return await this.adminRepository.find({
            where: {
                adm_active: true,
                adm_name: ILike(`%${search}%`)
            },
            order: {
                id: "desc"
            },
            take: rows_per_page,
            skip: rows_per_page * (page - 1)
        });
    }

    async update(id: number, updateAdminDto: UpdateAdminDto) {
        const admin = await this.adminRepository.findOneOrFail({ where: { id, adm_active: true } });

        if (compareSync(updateAdminDto.new_password, admin.password)) {
            return "New password is the same as the old one";
        }

        let admin_update: UpdateAdminDto & { password?: string } = { ...updateAdminDto };

        if (updateAdminDto.new_password) {
            admin_update = { ...admin_update, password: updateAdminDto.new_password };
        }

        this.adminRepository.merge(admin, admin_update);

        await this.adminRepository.save(admin);

        return null;
    }

    async remove(id: number) {
        const obj = await this.adminRepository.findOneOrFail({ where: { id, adm_active: true } });

        obj.adm_active = false;

        await this.adminRepository.save(obj);

        return null;
    }

    async findOne(id: number) {
        const obj = await this.adminRepository.findOneOrFail({ where: { id, adm_active: true } });

        return obj;
    }
}
