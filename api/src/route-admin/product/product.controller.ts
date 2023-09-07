import {
    BadRequestException,
    Body,
    Controller,
    FileTypeValidator,
    HttpCode,
    HttpStatus,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ConstHelper } from "src/helpers/const.helper";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("admin/product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post(":id")
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor("files"))
    async update(
        @Param("id") id: number,
        @Body() updateProductDto: UpdateProductDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: ConstHelper.MAX_SIZE_FILE }),
                    new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ })
                ]
            })
        )
        files?: Express.Multer.File[]
    ) {
        try {
            return await this.productService.update(id, updateProductDto, files);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }
}
