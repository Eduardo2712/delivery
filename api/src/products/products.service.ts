import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Like, Repository } from "typeorm";
import { ListProductDto } from "./dto/list-product.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private usersRepository: Repository<Product>
    ) {}

    async list(list_product_dto: ListProductDto) {
        return await this.usersRepository.findAndCount({
            where: {
                pro_id_type: In(list_product_dto.id_type_array),
                ...(list_product_dto.search ? { pro_name: Like(`%${list_product_dto.search}%`) } : {})
            },
            take: 20,
            skip: (list_product_dto.page - 1) * 20
        });
    }
}
