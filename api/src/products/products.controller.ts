import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ListProductDto } from "./dto/list-product.dto";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post("list")
    create(@Body() listProductDto: ListProductDto) {
        return this.productsService.list(ListProductDto);
    }
}
