import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "./auth/guards/jwt-auth.guard";
import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { ProductModule } from "./product/product.module";
import { OrderModule } from "./order/order.module";

@Module({
    imports: [AuthModule, CategoryModule, ProductModule, OrderModule],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtGuard
        }
    ],
    exports: []
})
export class RouteSiteModule {}
