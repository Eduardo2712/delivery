import { Controller, Delete, Get, HttpCode, Param, Query, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "src/entities/user.entity";
import { DatatableUserDto } from "./dto/datatable-user.dto";

@Controller("admin/user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/datatable")
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() datatableUserDto: DatatableUserDto): Promise<UserEntity[]> {
        return await this.userService.findAll(datatableUserDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async remove(@Param("id") id: number): Promise<string | null> {
        return await this.userService.remove(id);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async findOne(@Param("id") id: number): Promise<UserEntity> {
        return await this.userService.findOne(id);
    }
}
