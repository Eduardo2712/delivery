import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { Public } from "./decorators/is-public.decorator";

@Controller("admin/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post("/login")
    async login(@Body() authDto: AuthDto) {
        return await this.authService.login(authDto.email, authDto.password);
    }
}
