import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/file.entity";
import { ProductEntity } from "src/entities/product.entity";
import { DataSource, ILike, Repository } from "typeorm";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductFileEntity } from "src/entities/product-file.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { ServiceHelpers } from "src/helpers/service.helper";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
        @InjectRepository(ProductFileEntity)
        private readonly productFileRepository: Repository<ProductFileEntity>,
        private dataSource: DataSource
    ) {}

    async update(id: number, updateProductDto: UpdateProductDto, pictures?: Express.Multer.File[]): Promise<string | null> {
        const product = await this.productRepository.findOneOrFail({ where: { id, pro_active: true } });

        this.productRepository.merge(product, updateProductDto);

        await this.productRepository.save(product);

        return null;
    }

    async create(createProductDto: CreateProductDto, pictures?: Express.Multer.File[]): Promise<string | void> {
        const query_runner = this.dataSource.createQueryRunner();

        await query_runner.connect();
        await query_runner.startTransaction();

        try {
            const product = this.productRepository.create({ ...createProductDto, pro_active: true });

            await this.productRepository.save(product);

            if (pictures) {
                for (const file of pictures) {
                    const id = await ServiceHelpers.uploadFile(file, this.fileRepository);

                    await this.productFileRepository.save({
                        prl_id_product: product.id,
                        prl_id_file: id,
                        prl_active: true
                    });
                }
            }

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

    async findOne(id: number): Promise<ProductEntity | null> {
        const obj = await this.productRepository.findOneOrFail({
            where: { id, pro_active: true },
            relations: {
                files: {
                    file: true
                },
                histories: true
            }
        });

        if (obj.files.length > 0) {
            for (const file of obj.files) {
                file.file.fil_url = await file.file.fileUrl;
            }
        }

        return obj;
    }

    async findAll(search: string, rows_per_page: number, page: number): Promise<ProductEntity[]> {
        return await this.productRepository.find({
            where: {
                pro_active: true,
                pro_name: ILike(`%${search}%`)
            },
            order: {
                id: "desc"
            },
            take: rows_per_page,
            skip: rows_per_page * (page - 1)
        });
    }

    async remove(id: number): Promise<string | null> {
        const obj = await this.productRepository.findOneOrFail({ where: { id, pro_active: true } });

        obj.pro_active = false;

        await this.productRepository.save(obj);

        return null;
    }
}
