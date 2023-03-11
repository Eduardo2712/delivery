import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthRequest } from "../models/AuthRequest";
import { User } from "src/types/user.type";

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): User => {
        const request = context.switchToHttp().getRequest<AuthRequest>();

        return request.user;
    }
);
