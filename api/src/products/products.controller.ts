import { Controller, Post, Body } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ListProductDto } from "./dto/list-product.dto";
import { IsPublic } from "src/auth/decorators/is-public.decorator";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @IsPublic()
    @Post("list")
    list(@Body() listProductDto: ListProductDto) {
        return this.productsService.list(listProductDto);
    }
}
