import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { LoginRequestBody } from "../dto/login-auth.dto";

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        const login_request_body = new LoginRequestBody();

        login_request_body.email = body.email;
        login_request_body.password = body.password;

        const validations = await validate(login_request_body);

        if (validations.length) {
            throw new BadRequestException(
                validations.reduce((acc, curr) => {
                    return [...acc, ...Object.values(curr.constraints)];
                }, [])
            );
        }

        next();
    }
}
