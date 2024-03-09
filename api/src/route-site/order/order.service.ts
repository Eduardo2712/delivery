import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "src/entities/order.entity";
import { DataSource, Repository } from "typeorm";
import { AsyncLocalStorage } from "async_hooks";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        private dataSource: DataSource,
        private readonly als: AsyncLocalStorage<any>
    ) {}

    async create(createOrderDto: CreateOrderDto): Promise<string | void> {
        const query_runner = this.dataSource.createQueryRunner();

        await query_runner.connect();
        await query_runner.startTransaction();

        try {
            const order = this.orderRepository.create({
                ...createOrderDto,
                ord_id_user: this.als.getStore()?.sub
            });

            await this.orderRepository.save(order);
        } catch (error: unknown) {
            if (error instanceof Error) {
                await query_runner.rollbackTransaction();

                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        } finally {
            await query_runner.release();
        }
    }
}
