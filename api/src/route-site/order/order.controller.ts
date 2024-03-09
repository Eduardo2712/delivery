import { Controller, Post, Body, HttpStatus, HttpCode } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("order")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post("/")
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createOrderDto: CreateOrderDto): Promise<string | void> {
        return this.orderService.create(createOrderDto);
    }
}
