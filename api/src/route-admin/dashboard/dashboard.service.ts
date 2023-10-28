import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/entities/admin.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/entities/user.entity";
import { ProductEntity } from "src/entities/product.entity";
import { OrderEntity } from "src/entities/order.entity";
import { ItemEntity } from "src/entities/item.entity";

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(ItemEntity)
        private readonly itemRepository: Repository<ItemEntity>
    ) {}

    async get() {
        const admin_count = await this.adminRepository.count({
            where: {
                adm_active: true
            }
        });

        const user_count = await this.userRepository.count({
            where: {
                use_active: true
            }
        });

        const product_count = await this.productRepository.count({
            where: {
                pro_active: true
            }
        });

        const order_count = await this.orderRepository.count({
            where: {
                ord_active: true
            }
        });

        const orders = await this.orderRepository.find({
            relations: ["items"]
        });

        let value_amount = 0;

        orders.forEach((order) => {
            value_amount += Number(order.ord_delivery_fee);

            order.items.forEach((item) => {
                value_amount += Number(item.ite_price);
            });
        });

        const items_count = await this.itemRepository.count({
            where: {
                ite_active: true
            }
        });

        return {
            admin_count,
            user_count,
            product_count,
            order_count,
            value_amount,
            items_count
        };
    }
}
