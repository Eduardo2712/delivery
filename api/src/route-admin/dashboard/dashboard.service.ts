import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/entities/admin.entity";
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { Product } from "src/entities/product.entity";

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
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

        return {
            admin_count,
            user_count,
            product_count
        };
    }
}
