import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { OrderModule } from "./order/order.module";
import { ProductModule } from "./product/product.module";
import { UserModule } from "./user/user.module";
import { AdminModule } from "./admin/admin.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "./auth/guards/jwt-auth.guard";
import { ExtraModule } from "./extra/extra.module";

@Module({
    imports: [AdminModule, AuthModule, CategoryModule, DashboardModule, OrderModule, ProductModule, UserModule, ExtraModule],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtGuard
        }
    ],
    exports: []
})
export class RouteAdminModule {}
