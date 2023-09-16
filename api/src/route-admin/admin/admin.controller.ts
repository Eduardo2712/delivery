import {
    Controller,
    Post,
    Body,
    BadRequestException,
    Get,
    Query,
    Delete,
    Param,
    HttpCode,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ConstHelper } from "src/helpers/const.helper";

@Controller("admin/admin")
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post(":id")
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor("picture"))
    async update(
        @Param("id") id: number,
        @Body() updateAdminDto: UpdateAdminDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: ConstHelper.MAX_SIZE_FILE }),
                    new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ })
                ]
            })
        )
        picture: Express.Multer.File
    ) {
        try {
            return await this.adminService.update(id, updateAdminDto, picture);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor("picture"))
    async create(
        @Body() createAdminDto: CreateAdminDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: ConstHelper.MAX_SIZE_FILE }),
                    new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ })
                ]
            })
        )
        picture: Express.Multer.File
    ) {
        try {
            return await this.adminService.create(createAdminDto, picture);
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
            return await this.adminService.findAll(search, rows_per_page, page);
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
            return await this.adminService.findOne(id);
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
            return await this.adminService.remove(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }
}
