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
                adm_delete: false
            }
        });

        const user_count = await this.userRepository.count({
            where: {
                use_delete: false
            }
        });

        const product_count = await this.productRepository.count({
            where: {
                pro_delete: false
            }
        });

        const order_count = await this.orderRepository.count({
            where: {
                ord_delete: false
            }
        });

        const orders = await this.orderRepository.find({
            relations: ["itens"]
        });

        let value_amount = 0;

        orders.forEach((order) => {
            value_amount += order.ord_delivery_fee;

            order.itens.forEach((item) => {
                value_amount += item.ite_price;
            });
        });

        const itens_count = await this.itemRepository.count({
            where: {
                ite_delete: false
            }
        });

        return {
            admin_count,
            user_count,
            product_count,
            order_count,
            value_amount,
            itens_count
        };
    }
}