import { Controller, Post, Body, Get, Query, Delete, Param, HttpCode, HttpStatus, UseInterceptors, UploadedFile } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdminEntity } from "src/entities/admin.entity";
import { DatatableAdminDto } from "./dto/datatable-admin.dto";
import { ValidationHelpers } from "src/helpers/validation.helper";

@Controller()
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post(":id")
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor("picture"))
    async update(
        @Param("id") id: number,
        @Body() updateAdminDto: UpdateAdminDto,
        @UploadedFile(ValidationHelpers.FileConfig({ required: false }))
        picture: Express.Multer.File
    ): Promise<string | null> {
        return await this.adminService.update(id, updateAdminDto, picture);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor("picture"))
    async create(
        @Body() createAdminDto: CreateAdminDto,
        @UploadedFile(ValidationHelpers.FileConfig({ required: false }))
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
