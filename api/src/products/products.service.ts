import { Injectable, Inject } from "@nestjs/common";
import { ListProductDto } from "./dto/list-product.dto";
import { PRODUCTS_REPOSITORY } from "src/repository/repository";
import { Product } from "./entities/product.entity";
import { Op } from "sequelize";
import { Photo } from "src/photos/entities/photo.entity";

@Injectable()
export class ProductsService {
    constructor(@Inject(PRODUCTS_REPOSITORY) private productsRepository: typeof Product) {}

    async list(list_product_dto: ListProductDto) {
        const products = await this.productsRepository.findAndCountAll<Product>({
            where: {
                pro_id_type: list_product_dto.id_type_array,
                pro_name: list_product_dto.search ? { [Op.like]: `%${list_product_dto.search}%` } : { [Op.ne]: null }
            },
            include: [Photo],
            raw: true,
            nest: true,
            limit: 20,
            offset: (list_product_dto.page - 1) * 20
        });

        return products;
    }
}
