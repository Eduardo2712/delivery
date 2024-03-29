import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { OrderModule } from "./order/order.module";
import { ProductModule } from "./product/product.module";

export const RouteSite = [
    {
        path: "site",
        children: [
            {
                path: "auth",
                module: AuthModule
            },
            {
                path: "category",
                module: CategoryModule
            },
            {
                path: "product",
                module: ProductModule
            },
            {
                path: "order",
                module: OrderModule
            }
        ]
    }
];
