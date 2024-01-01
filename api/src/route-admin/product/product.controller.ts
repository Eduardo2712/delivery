import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    HttpCode,
    HttpStatus,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Query,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ConstHelper } from "src/helpers/const.helper";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductEntity } from "src/entities/product.entity";
import { DatatableProductDto } from "./dto/datatable-product.dto";

const FileConfig = new ParseFilePipe({
    validators: [new MaxFileSizeValidator({ maxSize: ConstHelper.MAX_SIZE_FILE }), new FileTypeValidator({ fileType: "image/*" })],
    fileIsRequired: false
});

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post(":id")
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor("picture"))
    async update(
        @Param("id") id: number,
        @Body() updateProductDto: UpdateProductDto,
        @UploadedFile(FileConfig)
        picture?: Express.Multer.File
    ): Promise<string | null> {
        return await this.productService.update(id, updateProductDto, picture);
    }

    @Post("/")
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor("picture"))
    async create(
        @Body() createProductDto: CreateProductDto,
        @UploadedFile(FileConfig)
        picture: Express.Multer.File
    ): Promise<string | void> {
        return await this.productService.create(createProductDto, picture);
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
