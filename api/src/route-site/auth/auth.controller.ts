import { Request, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/is-public.decorator";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { UserEntity } from "src/entities/user.entity";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    @HttpCode(HttpStatus.OK)
    async login(@Request() req): Promise<{
        token: string;
        user: UserEntity;
    }> {
        return await this.authService.login(req.user);
    }
}
