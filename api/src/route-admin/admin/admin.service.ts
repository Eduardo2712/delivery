import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/entities/admin.entity";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>
    ) {}

    async create(createAdminDto: CreateAdminDto) {
        const admin = this.adminRepository.create(createAdminDto);
        return await this.adminRepository.save(admin);
    }

    async findAll() {
        return await this.adminRepository.find();
    }

    async findOneOrFail(options?: FindOneOptions<Admin>) {
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
