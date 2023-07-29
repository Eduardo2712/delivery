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

    async validateAdmin(email: string, password: string) {
        let admin: AdminEntity;

        try {
            admin = await this.adminRepository.findOneOrFail({
                where: {
                    email
                }
            });
        } catch (error) {
            return null;
        }

        const is_password_valid = compareSync(password, admin.password);

        if (!is_password_valid) {
            return null;
        }

        return admin;
    }

    async login(admin: AdminEntity) {
        const payload = { sub: admin.id, email: admin.email };

        const user = await this.adminRepository.findOneOrFail({
            where: {
                id: admin.id
            },
            relations: {
                picture: true
            }
        });

        return {
            token: this.jwtService.sign(payload),
            user
        };
    }
}
