import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ) {}

    async list(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find({
            where: {
                cat_active: true
            }
        });

        return categories;
    }
}
