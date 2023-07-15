import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/entities/admin.entity";
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity";

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async get() {
        const admin_count = await this.adminRepository.count();
        const user_count = await this.userRepository.count();

        return {
            admin_count,
            user_count
        };
    }
}
