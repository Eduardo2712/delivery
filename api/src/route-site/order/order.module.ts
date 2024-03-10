import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "src/entities/order.entity";
import { AlsModule } from "src/als/als.module";

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity]), AlsModule],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService]
})
export class OrderModule {}
