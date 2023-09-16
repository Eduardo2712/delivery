import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/entities/admin.entity";
import { ILike, Repository } from "typeorm";
import { compareSync, hashSync } from "bcrypt";
import { ServiceHelpers } from "src/helpers/service.helper";
import { FileEntity } from "src/entities/file.entity";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>,
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>
    ) {}

    async create(createAdminDto: CreateAdminDto, picture: Express.Multer.File): Promise<string | null> {
        const error = await ServiceHelpers.checkUnique(this.adminRepository, { adm_name: createAdminDto.adm_name, adm_active: true }, "email");

        if (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }

        let id_picture: number | null = null;

        if (picture) {
            id_picture = await ServiceHelpers.uploadFile(picture, this.fileRepository);
        }

        const admin = this.adminRepository.create({
            ...createAdminDto,
            adm_active: true,
            adm_id_picture: id_picture,
            password: hashSync(createAdminDto.password, 10)
        });

        await this.adminRepository.save(admin);

        return null;
    }

    async findAll(search: string, rows_per_page: number, page: number): Promise<AdminEntity[]> {
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

    async update(id: number, updateAdminDto: UpdateAdminDto, picture: Express.Multer.File): Promise<string | null> {
        const admin = await this.adminRepository.findOneOrFail({ where: { id, adm_active: true } });

        if (updateAdminDto.password && updateAdminDto.confirm_password) {
            if (compareSync(updateAdminDto.password, admin.password)) {
                throw new HttpException("New password cannot be same as old password", HttpStatus.BAD_REQUEST);
            }
        }

        let id_picture: number | null = null;

        if (updateAdminDto.new_picture && picture) {
            id_picture = await ServiceHelpers.uploadFile(picture, this.fileRepository);
        }

        this.adminRepository.merge(admin, {
            ...updateAdminDto,
            adm_id_picture: id_picture || admin.adm_id_picture,
            password: updateAdminDto.password ? hashSync(updateAdminDto.password, 10) : admin.password
        });

        await this.adminRepository.save(admin);

        return null;
    }

    async remove(id: number): Promise<string | null> {
        const obj = await this.adminRepository.findOneOrFail({ where: { id, adm_active: true } });

        obj.adm_active = false;

        await this.adminRepository.save(obj);

        return null;
    }

    async findOne(id: number): Promise<AdminEntity> {
        const obj = await this.adminRepository.findOneOrFail({ where: { id, adm_active: true }, relations: { picture: true } });

        if (obj.adm_id_picture) {
            obj.picture.fil_url = await obj.picture.fileUrl;
        }

        return obj;
    }
}
