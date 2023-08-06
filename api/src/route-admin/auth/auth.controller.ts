import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { Public } from "./decorators/is-public.decorator";

@Controller("admin/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post("/login")
    async login(@Body() createAuthDto: CreateAuthDto) {
        try {
            return await this.authService.login(createAuthDto);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }
}
