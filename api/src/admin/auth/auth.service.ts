import { Injectable } from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { Admin } from "src/entities/admin.entity";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly adminService: AdminService, private readonly jwtService: JwtService) {}

    async validateAdmin(email: string, password: string) {
        let admin: Admin;

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

    async login(admin: Admin) {
        const payload = { sub: admin.id, email: admin.email };

        return {
            token: this.jwtService.sign(payload)
        };
    }
}
