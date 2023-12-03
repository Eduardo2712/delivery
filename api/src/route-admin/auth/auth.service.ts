import { Injectable, NotFoundException } from "@nestjs/common";
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

    async validateAdmin(email: string, pass: string): Promise<AdminEntity> {
        const admin = await this.adminRepository.findOneOrFail({
            where: {
                email,
                adm_active: true,
                adm_status: true
            }
        });

        const is_password_valid = compareSync(pass, admin.password);

        if (!is_password_valid) {
            return null;
        }

        const result = { ...admin, password: undefined };

        return result;
    }

    async login(email: string, pass: string): Promise<any> {
        const admin = await this.adminRepository.findOne({
            where: {
                email,
                adm_active: true,
                adm_status: true
            },
            relations: {
                picture: true
            }
        });

        if (!admin) {
            throw new NotFoundException("Email and/or password invalid!");
        }

        const is_password_valid = compareSync(pass, admin.password);

        if (!is_password_valid) {
            throw new NotFoundException("Email and/or password invalid!");
        }

        if (admin.adm_id_picture) {
            admin.picture.fil_url = await admin.picture.fileUrl;
        }

        const payload = { sub: admin.id, email: admin.email };

        const result = { ...admin, password: undefined };

        return {
            token: await this.jwtService.signAsync(payload),
            admin: result
        };
    }
}
