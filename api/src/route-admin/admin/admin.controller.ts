import {
    Controller,
    Post,
    Body,
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
import { AdminEntity } from "src/entities/admin.entity";
import { DatatableAdminDto } from "./dto/datatable-admin.dto";

const FileConfig = new ParseFilePipe({
    validators: [new MaxFileSizeValidator({ maxSize: ConstHelper.MAX_SIZE_FILE }), new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ })]
});

@Controller()
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post(":id")
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor("picture"))
    async update(
        @Param("id") id: number,
        @Body() updateAdminDto: UpdateAdminDto,
        @UploadedFile(FileConfig)
        picture: Express.Multer.File
    ): Promise<string | null> {
        return await this.adminService.update(id, updateAdminDto, picture);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor("picture"))
    async create(
        @Body() createAdminDto: CreateAdminDto,
        @UploadedFile(FileConfig)
        picture: Express.Multer.File
    ): Promise<string | null> {
        return await this.adminService.create(createAdminDto, picture);
    }

    @Get("/datatable")
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() datatableAdminDto: DatatableAdminDto): Promise<AdminEntity[]> {
        return await this.adminService.findAll(datatableAdminDto);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async findOne(@Param("id") id: number): Promise<AdminEntity> {
        return await this.adminService.findOne(id);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async remove(@Param("id") id: number): Promise<string | null> {
        return await this.adminService.remove(id);
    }
}
