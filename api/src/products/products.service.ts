import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "../models/product.model";
import { Op } from "sequelize";
import { ListProductDto } from "./dto/list-product.dto";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private readonly productModel: typeof Product
    ) {}

    list(list_product_dto: ListProductDto) {
        let where = {};

        where = {
            pro_id_type: list_product_dto.id_type_array
        };

        if (list_product_dto.search) {
            where = {
                ...where,
                pro_name: { [Op.like]: `%${list_product_dto.search}%` }
            };
        }

        const products = this.productModel.findAndCountAll<Product>({
            where: where,
            limit: 20,
            offset: (list_product_dto.page - 1) * 20
        });

        return products;
    }
}
