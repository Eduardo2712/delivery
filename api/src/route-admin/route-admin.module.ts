import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admin/admin.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { UserModule } from "./user/user.module";
import { OrderModule } from "./order/order.module";
import { ProductModule } from "./product/product.module";
import { CategoryModule } from "./category/category.module";

@Module({
    controllers: [],
    providers: [],
    imports: [AuthModule, AdminModule, DashboardModule, UserModule, OrderModule, ProductModule, CategoryModule]
})
export class RouteAdminModule {}
