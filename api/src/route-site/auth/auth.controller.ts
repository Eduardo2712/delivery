import { Request, Controller, HttpCode, HttpStatus, Post, UseGuards, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/is-public.decorator";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { UserEntity } from "src/entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: any): Promise<{
        token: string;
        user: UserEntity;
    }> {
        return await this.authService.login(req.user);
    }

    @Public()
    @Post("/register")
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() createUserDto: CreateUserDto): Promise<string | void> {
        return await this.authService.register(createUserDto);
    }
}
