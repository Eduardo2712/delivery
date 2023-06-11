import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private readonly productModel: typeof Product
    ) {
        this.productModel.addHook("beforeCreate", (product: Product) => {
            product.created_at = new Date();
            product.updated_at = new Date();
        });
    }

    create(createProductDto: CreateProductDto) {
        return "This action adds a new product";
    }
}
