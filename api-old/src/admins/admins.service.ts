import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "./entities/admin.entity";

@Injectable()
export class AdminsService {
    constructor(
        @InjectRepository(Admin)
        private adminsRepository: Repository<Admin>
    ) {}

    findByEmail(email: string) {
        const admin = this.adminsRepository.findOne({
            where: {
                email
            }
        });

        return admin;
    }
}
