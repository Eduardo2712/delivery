import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthRequestInterface } from "src/interfaces/auth.interface";
import { UserType } from "src/types/user.type";

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): UserType => {
    const request = context.switchToHttp().getRequest<AuthRequestInterface>();

    return request.user;
});
