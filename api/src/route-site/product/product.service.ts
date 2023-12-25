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

    async list(listProductDto: ListProductDto): Promise<{
        data: ProductEntity[];
        count: number;
    }> {
        const limit = 20;
        const skip = (listProductDto.page - 1) * limit;

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

        const [data, count] = await products.skip(skip).take(limit).getManyAndCount();

        return {
            data,
            count
        };
    }
}
