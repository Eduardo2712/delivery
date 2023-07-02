import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";

@Controller("admin")
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post()
    create(@Body() createAdminDto: CreateAdminDto) {
        try {
            return this.adminService.create(createAdminDto);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }
}
