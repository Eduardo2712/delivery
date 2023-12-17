import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { ProductModule } from "./product/product.module";

@Module({
    controllers: [],
    providers: [],
    imports: [AuthModule, CategoryModule, ProductModule]
})
export class RouteSiteModule {}
