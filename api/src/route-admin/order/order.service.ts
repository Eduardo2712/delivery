import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderStatusEntity } from "src/entities/order-status.entity";
import { OrderEntity } from "src/entities/order.entity";
import { Repository, SelectQueryBuilder } from "typeorm";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>
    ) {}

    async findAll(
        search: string,
        rows_per_page: number,
        page: number,
        id_user: number
    ): Promise<Array<OrderEntity & { items_count: number; order_value: number }>> {
        const query = this.orderRepository
            .createQueryBuilder("order")
            .where("order.ord_active = :active", { active: true })
            .leftJoin("order.user", "user")
            .leftJoin("order.items", "items", "items.ite_active = :active", { active: true })
            // .leftJoin("order.order_status", "order_status")
            // .addSelect(
            //     (qb: SelectQueryBuilder<any>) =>
            //         qb
            //             .select("order_status.id")
            //             .from("order_status", "order_status")
            //             .where("order_status.ors_active = :active", { active: true })
            //             .orderBy("order_status.created_at", "DESC")
            //             .limit(1),
            //     "order_status"
            // )
            .select(["order", "user.id", "user.use_name", "items"]);

        if (search && search.trim() !== "") {
            query.andWhere("user.use_name LIKE :name", { name: `%${search}%` });
        }

        if (id_user) {
            query.andWhere("user.id = :id", { id: id_user });
        }

        query
            .orderBy("order.id", "DESC")
            .take(rows_per_page)
            .skip(rows_per_page * (page - 1));

        const result = await query.getMany();

        const obj = result.map((order) => ({
            ...order,
            items_count: order.items.length,
            items: undefined,
            order_value: order.items.reduce((acc, item) => acc + Number(item.ite_price), 0)
        }));

        return obj;
    }

    async findOne(id: number): Promise<OrderEntity> {
        const obj = await this.orderRepository.findOneOrFail({
            where: { id, ord_active: true },
            relations: {
                user: true
            }
        });

        return obj;
    }
}
