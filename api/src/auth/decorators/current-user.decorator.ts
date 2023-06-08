import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthRequestInterface } from "src/interfaces/auth.interfaces";
import { UserType } from "src/types/user.types";

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): UserType => {
    const request = context.switchToHttp().getRequest<AuthRequestInterface>();

    return request.user;
});
