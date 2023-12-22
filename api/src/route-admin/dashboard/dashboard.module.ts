import { Module } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { DashboardController } from "./dashboard.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/entities/admin.entity";
import { UserEntity } from "src/entities/user.entity";
import { ProductEntity } from "src/entities/product.entity";
import { OrderEntity } from "src/entities/order.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity, UserEntity, ProductEntity, OrderEntity])],
    controllers: [DashboardController],
    providers: [DashboardService]
})
export class DashboardModule {}
