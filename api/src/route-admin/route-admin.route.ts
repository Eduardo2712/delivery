import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { OrderModule } from "./order/order.module";
import { ProductModule } from "./product/product.module";
import { UserModule } from "./user/user.module";

export const RouteAdmin = [
    {
        path: "admin",
        children: [
            {
                path: "auth",
                module: AuthModule
            },
            {
                path: "admin",
                module: AdminModule
            },
            {
                path: "category",
                module: CategoryModule
            },
            {
                path: "dashboard",
                module: DashboardModule
            },
            {
                path: "order",
                module: OrderModule
            },
            {
                path: "product",
                module: ProductModule
            },
            {
                path: "user",
                module: UserModule
            }
        ]
    }
];
