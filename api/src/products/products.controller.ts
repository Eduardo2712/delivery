import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException } from "@nestjs/common";
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
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }
}
