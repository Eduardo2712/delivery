import { Body, Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Public } from "../auth/decorators/is-public.decorator";
import { ProductEntity } from "src/entities/product.entity";
import { ListProductDto } from "./dto/list-product.dto";

@Controller("site/product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Public()
    @Get("/list")
    @HttpCode(HttpStatus.OK)
    async list(@Body() listProductDto: ListProductDto): Promise<ProductEntity[]> {
        return await this.productService.list(listProductDto);
    }
}
