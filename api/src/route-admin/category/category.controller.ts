import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller("admin/category")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get("/list")
    async findAll() {
        return await this.categoryService.findAll();
    }
}
