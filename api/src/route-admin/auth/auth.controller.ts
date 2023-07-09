import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { Public } from "./decorators/is-public.decorator";

@Controller("admin/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post("login")
    async login(@Body() createAuthDto: CreateAuthDto) {
        return await this.authService.login(createAuthDto);
    }
}
