import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "src/entities/order.entity";
import { Repository } from "typeorm";
import { DatatableOrderDto } from "./dto/datatable-order.dto";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>
    ) {}

    async findAll(
        datatableOrderDto: DatatableOrderDto
    ): Promise<Array<Partial<OrderEntity> & { item_count: number; order_value: number; status: string; status_color: string }>> {
        const query = this.orderRepository
            .createQueryBuilder("order")
            .where("order.ord_active = :active", { active: true })
            .leftJoin("order.user", "user")
            .leftJoin("order.items", "items")
            .leftJoin("order.order_status", "order_status", "order_status.ors_active = :active", { active: true })
            .leftJoin("order_status.status", "status")
            .select(["order", "user", "items", "order_status", "status"]);

        if (datatableOrderDto.search && datatableOrderDto.search.trim() !== "") {
            query.andWhere("user.use_name LIKE :name", { name: `%${datatableOrderDto.search}%` });
        }

        if (datatableOrderDto.id_user) {
            query.andWhere("user.id = :id", { id: datatableOrderDto.id_user });
        }

        query
            .orderBy("order.id", "DESC")
            .addOrderBy("order_status.id", "DESC")
            .take(datatableOrderDto.rows_per_page)
            .skip(datatableOrderDto.rows_per_page * (datatableOrderDto.page - 1));

        const result = await query.getMany();

        const obj = result.map((order) => ({
            ...order,
            item_count: order.items.length,
            items: undefined,
            order_status: undefined,
            order_value: order.items.reduce((acc, item) => acc + Number(item.ite_price), 0),
            status: order.order_status?.[0]?.status?.sta_name || "--",
            status_color: order.order_status?.[0]?.status?.sta_color || null
        }));

        return obj;
    }

    async findOne(id: number): Promise<OrderEntity> {
        const obj = await this.orderRepository
            .createQueryBuilder("order")
            .where("order.id = :id AND order.ord_active = :active", { id, active: true })
            .leftJoin("order.items", "items")
            .leftJoin("items.product", "product")
            .leftJoin("order.order_status", "order_status", "order_status.ors_active = :active", { active: true })
            .leftJoin("order_status.status", "status")
            .leftJoin("order.user", "user")
            .select(["order", "items", "product", "order_status", "status", "user"])
            .getOneOrFail();

        return obj;
    }
}
