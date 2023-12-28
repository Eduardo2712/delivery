import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/is-public.decorator";
import { AuthDto } from "./dto/auth.dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post("/login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() authDto: AuthDto) {
        return await this.authService.login(authDto.email, authDto.password);
    }
}
