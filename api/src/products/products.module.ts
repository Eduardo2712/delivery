import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { DatabaseModule } from "src/database/database.module";
import { productsProvider } from "./products.provider";

@Module({
    imports: [DatabaseModule],
    controllers: [ProductsController],
    providers: [ProductsService, ...productsProvider],
    exports: [ProductsService]
})
export class ProductsModule {}
