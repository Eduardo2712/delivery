import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtraEntity } from "src/entities/extra.entity";
import { ILike, Repository } from "typeorm";
import { DatatableExtraDto } from "./dto/datatable-extra.dto";
import { UpdateExtraDto } from "./dto/update-extra.dto";

@Injectable()
export class ExtraService {
    constructor(
        @InjectRepository(ExtraEntity)
        private readonly extraRepository: Repository<ExtraEntity>
    ) {}

    async findAll(datatableExtraDto: DatatableExtraDto): Promise<ExtraEntity[]> {
        const obj = await this.extraRepository.find({
            where: {
                ext_active: true,
                ext_name: ILike(`%${datatableExtraDto.search}%`)
            },
            order: {
                id: "desc"
            },
            take: datatableExtraDto.rows_per_page,
            skip: datatableExtraDto.rows_per_page * (datatableExtraDto.page - 1)
        });

        return obj;
    }

    async remove(id: number): Promise<string | null> {
        const obj = await this.extraRepository.findOneOrFail({
            where: {
                id,
                ext_active: true
            }
        });

        obj.ext_active = false;

        await this.extraRepository.save(obj);

        return null;
    }

    async update(id: number, updateExtraDto: UpdateExtraDto, picture: Express.Multer.File): Promise<string | null> {}
}
