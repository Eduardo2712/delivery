import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./products/products.module";
import databaseConfig from "./database/database.config";
import { User } from "./models/user.model";
import { File } from "./models/file.model";
import { ProductFile } from "./models/product-file.model";
import { AdminsModule } from "./admins/admins.module";
import { Admin } from "./models/admin.model";
import { Product } from "./models/product.model";
import { OrdersModule } from "./orders/orders.module";
import { Order } from "./models/order.model";

@Module({
    imports: [
        SequelizeModule.forRoot({
            ...databaseConfig,
            autoLoadModels: true,
            synchronize: true,
            models: [User, File, ProductFile, Admin, Product, Order]
        }),
        UsersModule,
        AuthModule,
        ProductsModule,
        AdminsModule,
        OrdersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
