import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryEntity } from "src/entities/category.entity";
import { Public } from "../auth/decorators/is-public.decorator";

@Controller()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Public()
    @Get("/list")
    @HttpCode(HttpStatus.OK)
    async list(): Promise<CategoryEntity[]> {
        return await this.categoryService.list();
    }
}
