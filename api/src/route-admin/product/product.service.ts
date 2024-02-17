import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/file.entity";
import { ProductEntity } from "src/entities/product.entity";
import { DataSource, ILike, In, Repository } from "typeorm";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductHistoryEntity } from "src/entities/product-history.entity";
import { CategoryEntity } from "src/entities/category.entity";
import { DatatableProductDto } from "./dto/datatable-product.dto";
import { ServiceHelpers } from "src/helpers/service.helper";
import { AsyncLocalStorage } from "async_hooks";
import { ProductExtraEntity } from "src/entities/product-extra.entity";

export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
        @InjectRepository(ProductHistoryEntity)
        private readonly productHistoryRepository: Repository<ProductHistoryEntity>,
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
        @InjectRepository(ProductExtraEntity)
        private readonly productExtraRepository: Repository<ProductExtraEntity>,
        private readonly als: AsyncLocalStorage<any>,
        private dataSource: DataSource
    ) {}

    async create(createProductDto: CreateProductDto, picture: Express.Multer.File): Promise<string | void> {
        const error = await ServiceHelpers.checkArrayExists([
            {
                repository: this.categoryRepository,
                where: { cat_active: true, id: createProductDto.pro_id_category },
                field: "category"
            }
        ]);

        if (error) {
            throw new BadRequestException(error);
        }

        const query_runner = this.dataSource.createQueryRunner();

        await query_runner.connect();
        await query_runner.startTransaction();

        try {
            const id_picture = await ServiceHelpers.uploadFile(picture, this.fileRepository);

            const product = this.productRepository.create({
                ...createProductDto,
                pro_active: true,
                pro_id_image: id_picture
            });

            await this.productRepository.save(product);

            if (createProductDto.extras) {
                for (const extra of createProductDto.extras) {
                    const aux = this.productExtraRepository.create({
                        pre_id_product: product.id,
                        pre_id_extra: extra.id
                    });

                    await this.productExtraRepository.save(aux);
                }
            }

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

    async update(id: number, updateProductDto: UpdateProductDto, picture?: Express.Multer.File): Promise<string | null> {
        const error = await ServiceHelpers.checkArrayExists([
            {
                repository: this.categoryRepository,
                where: { cat_active: true, id: updateProductDto.pro_id_category },
                field: "category"
            }
        ]);

        if (error) {
            throw new BadRequestException(error);
        }

        const product = await this.productRepository.findOneOrFail({ where: { id, pro_active: true } });

        const query_runner = this.dataSource.createQueryRunner();

        await query_runner.connect();
        await query_runner.startTransaction();

        try {
            if (picture && updateProductDto.new_picture) {
                product.pro_id_image = await ServiceHelpers.uploadFile(picture, this.fileRepository);
            }

            if (product.pro_price !== updateProductDto.pro_price) {
                const aux = this.productHistoryRepository.create({
                    prh_id_product: product.id,
                    prh_price: updateProductDto.pro_price,
                    prh_date: new Date(),
                    prh_id_admin: this.als.getStore()?.sub
                });

                await this.productHistoryRepository.save(aux);
            }

            this.productRepository.merge(product, { ...updateProductDto, extras: undefined });

            await this.productRepository.save(product);

            if (updateProductDto.extras) {
                for (const extra of updateProductDto.extras) {
                    if (!extra.id_old) {
                        const aux = this.productExtraRepository.create({
                            pre_id_product: product.id,
                            pre_id_extra: extra.id
                        });

                        await this.productExtraRepository.save(aux);
                    }
                }
            }

            if (updateProductDto.extras_deleted.length > 0) {
                await this.productExtraRepository.delete({
                    pre_id_product: product.id,
                    pre_id_extra: In(updateProductDto.extras_deleted)
                });
            }

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

    async findOne(id: number): Promise<ProductEntity | null> {
        const obj = await this.productRepository.findOneOrFail({
            where: { id, pro_active: true },
            relations: {
                histories: {
                    admin: true
                },
                image: true,
                extras: {
                    extra: true
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
