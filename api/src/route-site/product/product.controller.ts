import { Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Public } from "../auth/decorators/is-public.decorator";
import { ProductEntity } from "src/entities/product.entity";
import { ListProductDto } from "./dto/list-product.dto";

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Public()
    @Get("/list")
    @HttpCode(HttpStatus.OK)
    async list(@Query() listProductDto: ListProductDto): Promise<{
        data: ProductEntity[];
        count: number;
    }> {
        return await this.productService.list(listProductDto);
    }
}
