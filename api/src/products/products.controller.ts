import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { IsPublic } from "src/auth/decorators/is-public.decorator";
import { ListProductDto } from "./dto/list-product.dto";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @IsPublic()
    @Post("list")
    @HttpCode(HttpStatus.OK)
    async list(@Body() listProductDto: ListProductDto) {
        try {
            return await this.productsService.list(listProductDto);
        } catch (err) {
            throw new Error("Error getting data.");
        }
    }
}
