import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "src/entities/product.entity";
import { FileEntity } from "src/entities/file.entity";
import { ProductHistoryEntity } from "src/entities/product-history.entity";
import { CategoryEntity } from "src/entities/category.entity";
import { AlsModule } from "src/als/als.module";
import { ProductExtraEntity } from "src/entities/product-extra.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, FileEntity, ProductHistoryEntity, CategoryEntity, ProductExtraEntity]), AlsModule],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule {}
