import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("admin/user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/list-all")
    async findAll(@Query("search") search?: string, @Query("rows_per_page") rows_per_page = 10, @Query("page") page = 1) {
        try {
            return await this.userService.findAll(search, rows_per_page, page);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }
}
