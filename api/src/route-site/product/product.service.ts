import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/entities/product.entity";
import { Repository } from "typeorm";
import { ListProductDto } from "./dto/list-product.dto";

const PAGE_LIMIT = 20;

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
        const skip = (listProductDto.page - 1) * PAGE_LIMIT;

        const products = this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.files", "files")
            .leftJoinAndSelect("files.file", "file")
            .leftJoinAndSelect("product.extras", "extras")
            .leftJoinAndSelect("product.ratings", "ratings");

        if (listProductDto.id_category) {
            products.where("product.pro_id_category = :id_category", { id_category: listProductDto.id_category });
        }

        if (listProductDto.search) {
            products.where("product.pro_name like :search", { search: `%${listProductDto.search}%` });
        }

        products.orderBy("product.pro_name", "ASC");

        const [data, count] = await products.skip(skip).take(PAGE_LIMIT).getManyAndCount();

        data.forEach((product) => {
            product.avg_rating = product.ratings.length > 0 ? product.ratings.reduce((acc, a) => acc + a.prr_rate, 0) / product.ratings.length : null;
            product.ratings = undefined;
        });

        return {
            data,
            count
        };
    }
}
