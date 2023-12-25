import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Query,
    Req,
    UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ConstHelper } from "src/helpers/const.helper";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { Request } from "express";
import { AdminPayloadType } from "src/types/types";
import { ProductEntity } from "src/entities/product.entity";
import { DatatableProductDto } from "./dto/datatable-product.dto";

@Controller("admin/product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post(":id")
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FilesInterceptor("pictures", 5))
    async update(
        @Param("id") id: number,
        @Body() updateProductDto: UpdateProductDto,
        @UploadedFiles(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({ maxSize: ConstHelper.MAX_SIZE_FILE })],
                fileIsRequired: false
            })
        )
        pictures?: Array<Express.Multer.File> | undefined,
        @Req() req?: Request
    ): Promise<string | null> {
        return await this.productService.update(id, updateProductDto, pictures, req?.user as AdminPayloadType);
    }

    @Post("/")
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FilesInterceptor("pictures", 5))
    async create(
        @Body() createProductDto: CreateProductDto,
        @UploadedFiles(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({ maxSize: ConstHelper.MAX_SIZE_FILE })]
            })
        )
        pictures: Array<Express.Multer.File>
    ): Promise<string | void> {
        return await this.productService.create(createProductDto, pictures);
    }

    @Get("/datatable")
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() datatableProductDto: DatatableProductDto): Promise<ProductEntity[]> {
        return await this.productService.findAll(datatableProductDto);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async findOne(@Param("id") id: number): Promise<ProductEntity> {
        return await this.productService.findOne(id);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async remove(@Param("id") id: number): Promise<string | null> {
        return await this.productService.remove(id);
    }
}
