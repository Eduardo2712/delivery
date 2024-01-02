import { Module } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { DashboardController } from "./dashboard.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/entities/admin.entity";
import { UserEntity } from "src/entities/user.entity";
import { ProductEntity } from "src/entities/product.entity";
import { OrderEntity } from "src/entities/order.entity";
import { ExtraEntity } from "src/entities/extra.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity, UserEntity, ProductEntity, OrderEntity, ExtraEntity])],
    controllers: [DashboardController],
    providers: [DashboardService]
})
export class DashboardModule {}
