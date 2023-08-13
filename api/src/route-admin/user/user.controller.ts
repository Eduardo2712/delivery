import { BadRequestException, Controller, Delete, Get, HttpCode, Param, Query, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("admin/user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/list-all")
    @HttpCode(HttpStatus.OK)
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

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async remove(@Param("id") id: number) {
        try {
            return await this.userService.remove(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }
}
