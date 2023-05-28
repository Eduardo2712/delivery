import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { IsPublic } from "src/auth/decorators/is-public.decorator";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @IsPublic()
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.usersService.create(createUserDto);
        } catch (error: any) {
            throw new BadRequestException(error.message);
        }
    }
}
