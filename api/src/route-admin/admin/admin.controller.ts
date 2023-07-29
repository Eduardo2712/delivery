import { Controller, Post, Body, BadRequestException, Get, Query, Delete, Param } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";

@Controller("admin/admin")
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post()
    async create(@Body() createAdminDto: CreateAdminDto) {
        try {
            return await this.adminService.create(createAdminDto);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }

    @Get("/list-all")
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

    @Delete(":id")
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
