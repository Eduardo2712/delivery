import {
    BadRequestException,
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
    UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ConstHelper } from "src/helpers/const.helper";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";

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
                validators: [new MaxFileSizeValidator({ maxSize: ConstHelper.MAX_SIZE_FILE })]
            })
        )
        pictures: Array<Express.Multer.File>
    ) {
        try {
            return await this.productService.update(id, updateProductDto, pictures);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
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
    ) {
        try {
            return await this.productService.create(createProductDto, pictures);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }

    @Get("/list-all")
    @HttpCode(HttpStatus.OK)
    async findAll(@Query("search") search?: string, @Query("rows_per_page") rows_per_page = 10, @Query("page") page = 1) {
        try {
            return await this.productService.findAll(search, rows_per_page, page);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async findOne(@Param("id") id: number) {
        try {
            return await this.productService.findOne(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async remove(@Param("id") id: number) {
        try {
            return await this.productService.remove(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }
}
