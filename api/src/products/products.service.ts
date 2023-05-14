import { Injectable } from "@nestjs/common";
import { ListProductDto } from "./dto/list-product.dto";

@Injectable()
export class ProductsService {
    async list(listProductDto: ListProductDto) {}
}
