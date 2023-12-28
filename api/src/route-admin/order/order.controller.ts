import { Controller, Get, HttpCode, HttpStatus, Param, Query } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderEntity } from "src/entities/order.entity";
import { DatatableOrderDto } from "./dto/datatable-order.dto";

@Controller()
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get("/datatable")
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Query() datatableOrderDto: DatatableOrderDto
    ): Promise<Array<OrderEntity & { items_count: number; order_value: number; status: string; status_color: string }>> {
        return await this.orderService.findAll(datatableOrderDto);
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async findOne(@Param("id") id: number): Promise<OrderEntity> {
        return await this.orderService.findOne(id);
    }
}
