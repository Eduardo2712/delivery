import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { IsPublic } from "src/auth/decorators/is-public.decorator";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @IsPublic()
    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.usersService.create(createUserDto);
        } catch (err) {
            throw new Error("Error getting data.");
        }
    }
}
