import { Injectable } from "@nestjs/common";
import { AdminEntity } from "src/entities/admin.entity";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>,
        private readonly jwtService: JwtService
    ) {}

    async validateAdmin(email: string, password: string): Promise<AdminEntity> {
        const admin = await this.adminRepository.findOne({
            where: {
                email,
                adm_active: true,
                adm_status: true
            },
            relations: ["picture"]
        });

        if (admin && compareSync(password, admin.password)) {
            return admin;
        }

        return null;
    }

    async login(admin: AdminEntity): Promise<{
        token: string;
        admin: AdminEntity;
    }> {
        const payload = {
            sub: admin.id,
            email: admin.email
        };

        return {
            token: this.jwtService.sign(payload),
            admin
        };
    }
}
