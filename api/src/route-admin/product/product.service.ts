import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/file.entity";
import { ProductEntity } from "src/entities/product.entity";
import { Repository } from "typeorm";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductFileEntity } from "src/entities/product-file.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
        @InjectRepository(ProductFileEntity)
        private readonly productFileRepository: Repository<ProductFileEntity>
    ) {}

    async update(id: number, updateProductDto: UpdateProductDto, picture?: Express.Multer.File[]): Promise<string | null> {
        const product = await this.productRepository.findOneOrFail({ where: { id, pro_active: true } });

        this.productRepository.merge(product, updateProductDto);

        await this.productRepository.save(product);

        return null;
    }
}
