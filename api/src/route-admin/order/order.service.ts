import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "src/entities/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>
    ) {}

    async findAll(search: string, rows_per_page: number, page: number, id_user: number): Promise<OrderEntity[]> {
        const query = this.orderRepository
            .createQueryBuilder("order")
            .leftJoinAndSelect("order.user", "user")
            .where("order.ord_active = :active", { active: true });

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

        return await query.getMany();
    }

    async findOne(id: number): Promise<OrderEntity> {
        const obj = await this.orderRepository.findOneOrFail({
            where: { id, ord_active: true }
        });

        return obj;
    }
}
