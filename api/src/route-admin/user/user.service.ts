import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { ILike, Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findAll(search: string, rows_per_page: number, page: number): Promise<UserEntity[]> {
        return await this.userRepository.find({
            where: {
                use_active: true,
                use_name: ILike(`%${search}%`)
            },
            order: {
                id: "desc"
            },
            take: rows_per_page,
            skip: rows_per_page * (page - 1)
        });
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
}
