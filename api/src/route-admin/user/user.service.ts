import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { ILike, Repository } from "typeorm";
import { DatatableUserDto } from "./dto/datatable-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findAll(datatableUserDto: DatatableUserDto): Promise<UserEntity[]> {
        const users = await this.userRepository.find({
            where: {
                use_active: true,
                use_name: ILike(`%${datatableUserDto.search}%`)
            },
            order: {
                id: "desc"
            },
            take: datatableUserDto.rows_per_page,
            skip: datatableUserDto.rows_per_page * (datatableUserDto.page - 1)
        });

        return users;
    }

    async remove(id: number): Promise<string | null> {
        const obj = await this.userRepository.findOneOrFail({
            where: {
                id,
                use_active: true
            }
        });

        obj.use_active = false;

        await this.userRepository.save(obj);

        return null;
    }

    async findOne(id: number): Promise<UserEntity> {
        const obj = await this.userRepository.findOneOrFail({
            relations: {
                picture: true
            },
            where: {
                id,
                use_active: true
            }
        });

        return obj;
    }
}
