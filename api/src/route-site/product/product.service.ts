import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/entities/product.entity";
import { Repository } from "typeorm";
import { ListProductDto } from "./dto/list-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) {}

    async list(listProductDto: ListProductDto): Promise<ProductEntity[]> {
        const products = this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.files", "files")
            .leftJoinAndSelect("files.file", "file");

        if (listProductDto.id_category) {
            products.where("product.pro_id_category = :id_category", { id_category: listProductDto.id_category });
        }

        if (listProductDto.search) {
            products.where("product.pro_name like :search", { search: `%${listProductDto.search}%` });
        }

        products.orderBy("product.pro_name", "ASC");

        const aux = await products.getMany();

        for (const product of aux) {
            for (const file of product.files) {
                file.file.fil_url = await file.file.fileUrl;
            }
        }

        return aux;
    }
}
