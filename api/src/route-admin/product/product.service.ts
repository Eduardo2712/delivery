import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/file.entity";
import { ProductEntity } from "src/entities/product.entity";
import { DataSource, ILike, Repository } from "typeorm";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductFileEntity } from "src/entities/product-file.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { ServiceHelpers } from "src/helpers/service.helper";
import { ProductHistoryEntity } from "src/entities/product-history.entity";
import { CategoryEntity } from "src/entities/category.entity";
import { DatatableProductDto } from "./dto/datatable-product.dto";
import { AdminStorage } from "src/storages/admin.storage";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
        @InjectRepository(ProductFileEntity)
        private readonly productFileRepository: Repository<ProductFileEntity>,
        @InjectRepository(ProductHistoryEntity)
        private readonly productHistoryRepository: Repository<ProductHistoryEntity>,
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
        private dataSource: DataSource
    ) {}

    async create(createProductDto: CreateProductDto, pictures?: Express.Multer.File[]): Promise<string | void> {
        await this.categoryRepository.findOneOrFail({ where: { id: createProductDto.pro_id_category, cat_active: true } });

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

    async update(id: number, updateProductDto: UpdateProductDto, pictures?: Express.Multer.File[] | undefined): Promise<string | null> {
        await this.categoryRepository.findOneOrFail({ where: { id: updateProductDto.pro_id_category, cat_active: true } });

        const product = await this.productRepository.findOneOrFail({ where: { id, pro_active: true } });

        const query_runner = this.dataSource.createQueryRunner();

        await query_runner.connect();
        await query_runner.startTransaction();

        console.log(AdminStorage.get());

        try {
            if (product.pro_price !== updateProductDto.pro_price) {
                const aux = this.productHistoryRepository.create({
                    prh_id_product: product.id,
                    prh_price: updateProductDto.pro_price,
                    prh_date: new Date(),
                    prh_id_admin: AdminStorage.get().id
                });

                await this.productHistoryRepository.save(aux);
            }

            this.productRepository.merge(product, updateProductDto);

            await this.productRepository.save(product);

            if (updateProductDto.pictures_delete?.length > 0) {
                for (const id_file of updateProductDto.pictures_delete) {
                    const aux = await this.productFileRepository.findOneOrFail({ where: { id: id_file }, relations: ["file"] });

                    await ServiceHelpers.removeFile(aux.file.fil_name);

                    await this.productFileRepository.remove(aux);
                }
            }

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

    async findOne(id: number): Promise<ProductEntity | null> {
        const obj = await this.productRepository.findOneOrFail({
            where: { id, pro_active: true },
            relations: {
                files: {
                    file: true
                },
                histories: {
                    admin: true
                }
            }
        });

        return obj;
    }

    async findAll(datatableProductDto: DatatableProductDto): Promise<ProductEntity[]> {
        return await this.productRepository.find({
            where: {
                pro_active: true,
                pro_name: ILike(`%${datatableProductDto.search}%`)
            },
            order: {
                id: "desc"
            },
            take: datatableProductDto.rows_per_page,
            skip: datatableProductDto.rows_per_page * (datatableProductDto.page - 1)
        });
    }

    async remove(id: number): Promise<string | null> {
        const obj = await this.productRepository.findOneOrFail({ where: { id, pro_active: true } });

        obj.pro_active = false;

        await this.productRepository.save(obj);

        return null;
    }
}
