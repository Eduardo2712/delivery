import { Controller, Get, HttpCode, HttpStatus, Param, Query } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderEntity } from "src/entities/order.entity";

@Controller("admin/order")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get("/list-all")
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Query("search") search?: string,
        @Query("rows_per_page") rows_per_page = 10,
        @Query("page") page = 1,
        @Query("id_user") id_user?: number
    ): Promise<Array<OrderEntity & { items_count: number; order_value: number; status: string; status_color: string }>> {
        return await this.orderService.findAll(search, rows_per_page, page, id_user);
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async findOne(@Param("id") id: number): Promise<OrderEntity> {
        return await this.orderService.findOne(id);
    }
}
