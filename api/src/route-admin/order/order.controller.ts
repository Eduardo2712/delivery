import { Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { OrderService } from "./order.service";

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
    ) {
        return await this.orderService.findAll(search, rows_per_page, page, id_user);
    }
}
