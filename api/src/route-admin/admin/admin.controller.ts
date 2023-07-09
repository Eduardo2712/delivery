import { Controller, Post, Body, BadRequestException, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { AuthGuard } from "../auth/guard/auth.guard";

@Controller("admin")
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post()
    @UseGuards(AuthGuard)
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
}
