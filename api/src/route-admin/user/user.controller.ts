import { Controller, Delete, Get, HttpCode, Param, Query, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("admin/user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/list-all")
    @HttpCode(HttpStatus.OK)
    async findAll(@Query("search") search?: string, @Query("rows_per_page") rows_per_page = 10, @Query("page") page = 1) {
        return await this.userService.findAll(search, rows_per_page, page);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async remove(@Param("id") id: number) {
        return await this.userService.remove(id);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async findOne(@Param("id") id: number) {
        return await this.userService.findOne(id);
    }
}
