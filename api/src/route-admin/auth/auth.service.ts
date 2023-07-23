import { Injectable } from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { AdminEntity } from "src/entities/admin.entity";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly adminService: AdminService, private readonly jwtService: JwtService) {}

    async validateAdmin(email: string, password: string) {
        let admin: AdminEntity;

        try {
            admin = await this.adminService.findOneOrFail({
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

        const user = await this.adminService.findOneOrFail({
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
