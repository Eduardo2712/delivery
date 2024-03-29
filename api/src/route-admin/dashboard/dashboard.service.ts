import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/entities/admin.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/entities/user.entity";
import { ProductEntity } from "src/entities/product.entity";
import { OrderEntity } from "src/entities/order.entity";
import { ExtraEntity } from "src/entities/extra.entity";

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
        @InjectRepository(ExtraEntity)
        private readonly extraRepository: Repository<ExtraEntity>
    ) {}

    async get(): Promise<{
        admin_count: number;
        user_count: number;
        product_count: number;
        order_count: number;
        value_amount: number;
        extra_count: number;
    }> {
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

        const extra_count = await this.extraRepository.count({
            where: {
                ext_active: true
            }
        });

        const orders = await this.orderRepository.find({
            relations: ["products"]
        });

        let value_amount = 0;

        orders.forEach((order) => {
            value_amount += Number(order.ord_delivery_fee);

            order.products.forEach((product) => {
                value_amount += Number(product.orp_price);
            });
        });

        return {
            admin_count,
            user_count,
            product_count,
            order_count,
            value_amount,
            extra_count
        };
    }
}
