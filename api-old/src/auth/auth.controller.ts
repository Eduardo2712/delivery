import { BadRequestException, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { IsPublic } from "./decorators/is-public.decorator";
import { AdminRequestInterface } from "src/interfaces/admin.interface";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AdminRequestInterface) {
        try {
            return await this.authService.login(req.user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException("Error");
        }
    }
}
