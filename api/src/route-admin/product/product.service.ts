import { BadRequestException, Inject, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/file.entity";
import { ProductEntity } from "src/entities/product.entity";
import { DataSource, ILike, Repository } from "typeorm";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductHistoryEntity } from "src/entities/product-history.entity";
import { CategoryEntity } from "src/entities/category.entity";
import { DatatableProductDto } from "./dto/datatable-product.dto";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { ServiceHelpers } from "src/helpers/service.helper";

@Injectable({ scope: Scope.REQUEST })
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
        @Inject(REQUEST) private readonly request: Request,
        private dataSource: DataSource
    ) {}

    async create(createProductDto: CreateProductDto, picture: Express.Multer.File): Promise<string | void> {
        const exist = await ServiceHelpers.checkExists(
            this.categoryRepository,
            { id: createProductDto.pro_id_category, cat_active: true },
            "category"
        );

        if (exist) {
            throw new BadRequestException(exist);
        }

        const query_runner = this.dataSource.createQueryRunner();

        await query_runner.connect();
        await query_runner.startTransaction();

        try {
            const id_picture = await ServiceHelpers.uploadFile(picture, this.fileRepository);

            const product = this.productRepository.create({ ...createProductDto, pro_active: true, pro_id_image: id_picture });

            await this.productRepository.save(product);

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

    async update(id: number, updateProductDto: UpdateProductDto, picture?: Express.Multer.File): Promise<string | null> {
        await this.categoryRepository.findOneOrFail({ where: { id: updateProductDto.pro_id_category, cat_active: true } });

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
                    prh_id_admin: this.request.user["sub"]
                });

                await this.productHistoryRepository.save(aux);
            }

            this.productRepository.merge(product, updateProductDto);

            await this.productRepository.save(product);

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
                image: true
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
