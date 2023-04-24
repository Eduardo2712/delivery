import { Controller, Post, Body } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ListProductDto } from "./dto/list-product.dto";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    list(@Body() listProductDto: ListProductDto) {
        return this.productsService.list(listProductDto);
    }
}
