import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "src/entities/product.entity";
import { FileEntity } from "src/entities/file.entity";
import { ProductFileEntity } from "src/entities/product-file.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, FileEntity, ProductFileEntity])],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule {}
