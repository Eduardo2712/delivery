import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/file.entity";
import { ProductEntity } from "src/entities/product.entity";
import { DataSource, Repository } from "typeorm";
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

    async update(id: number, updateProductDto: UpdateProductDto, files?: Express.Multer.File[]): Promise<string | null> {
        const product = await this.productRepository.findOneOrFail({ where: { id, pro_active: true } });

        this.productRepository.merge(product, updateProductDto);

        await this.productRepository.save(product);

        return null;
    }

    async create(createProductDto: CreateProductDto, files?: Express.Multer.File[]): Promise<string | null> {
        const query_runner = this.dataSource.createQueryRunner();

        await query_runner.connect();
        await query_runner.startTransaction();

        try {
            const product = this.productRepository.create({ ...createProductDto, pro_active: true });

            await this.productRepository.save(product);

            if (files) {
                for (const file of files) {
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

            return null;
        }
    }
}
