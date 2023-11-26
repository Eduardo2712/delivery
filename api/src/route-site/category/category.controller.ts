import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryEntity } from "src/entities/category.entity";

@Controller("category")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get("/list")
    @HttpCode(HttpStatus.OK)
    async list(): Promise<CategoryEntity[]> {
        return await this.categoryService.list();
    }
}
