import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtraEntity } from "src/entities/extra.entity";
import { DataSource, ILike, Repository } from "typeorm";
import { DatatableExtraDto } from "./dto/datatable-extra.dto";
import { UpdateExtraDto } from "./dto/update-extra.dto";
import { CreateExtraDto } from "./dto/create-extra.dto";
import { ServiceHelpers } from "src/helpers/service.helper";
import { FileEntity } from "src/entities/file.entity";

@Injectable()
export class ExtraService {
    constructor(
        @InjectRepository(ExtraEntity)
        private readonly extraRepository: Repository<ExtraEntity>,
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
        private dataSource: DataSource
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

    async findOne(id: number): Promise<ExtraEntity | null> {
        const obj: ExtraEntity = await this.extraRepository.findOneOrFail({
            where: {
                id,
                ext_active: true
            }
        });

        return obj;
    }

    async create(createExtraDto: CreateExtraDto, picture: Express.Multer.File): Promise<string | void> {
        const query_runner = this.dataSource.createQueryRunner();

        await query_runner.connect();
        await query_runner.startTransaction();

        try {
            const id_picture = await ServiceHelpers.uploadFile(picture, this.fileRepository);

            const extra = this.extraRepository.create({
                ...createExtraDto,
                ext_active: true,
                ext_id_picture: id_picture
            });

            await this.extraRepository.save(extra);

            await query_runner.commitTransaction();
        } catch (error: unknown) {
            if (error instanceof Error) {
                await query_runner.rollbackTransaction();

                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        } finally {
            await query_runner.release();
        }
    }

    async update(id: number, updateExtraDto: UpdateExtraDto, picture?: Express.Multer.File): Promise<string | null> {
        const extra = await this.extraRepository.findOneOrFail({
            where: {
                id,
                ext_active: true
            }
        });

        const query_runner = this.dataSource.createQueryRunner();

        await query_runner.connect();
        await query_runner.startTransaction();

        try {
            if (picture && updateExtraDto.new_picture) {
                extra.ext_id_picture = await ServiceHelpers.uploadFile(picture, this.fileRepository);
            }

            this.extraRepository.merge(extra, updateExtraDto);

            await this.extraRepository.save(extra);

            await query_runner.commitTransaction();

            return null;
        } catch (error: unknown) {
            if (error instanceof Error) {
                await query_runner.rollbackTransaction();

                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        } finally {
            await query_runner.release();
        }
    }
}
