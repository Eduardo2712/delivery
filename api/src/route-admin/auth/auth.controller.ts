import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { Public } from "./decorators/is-public.decorator";
import { AdminEntity } from "src/entities/admin.entity";

@Controller("admin/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post("/login")
    async login(@Body() authDto: AuthDto): Promise<{
        token: string;
        admin: AdminEntity;
    }> {
        return await this.authService.login(authDto.email, authDto.password);
    }
}
