import { Controller, Post, HttpCode, HttpStatus, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/is-public.decorator";
import { AdminEntity } from "src/entities/admin.entity";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshJwtGuard } from "./guards/refresh-jwt.guard";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    @HttpCode(HttpStatus.OK)
    async login(@Request() req): Promise<{
        token: string;
        refresh_token: string;
        admin: AdminEntity;
    }> {
        return await this.authService.login(req.user);
    }

    @Public()
    @UseGuards(RefreshJwtGuard)
    @Post("/refresh")
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Request() req): Promise<{
        token: string;
    }> {
        return await this.authService.refreshToken(req.user);
    }
}
