import { Injectable, NestMiddleware } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AlsMiddleware implements NestMiddleware {
    constructor(private readonly als: AsyncLocalStorage<any>) {}
    use(req: Request, _: Response, next: NextFunction) {
        const authorization = req.headers["authorization"];

        if (authorization) {
            const token = authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            this.als.run(decoded, () => next());
        } else {
            this.als.run(null, () => next());
        }
    }
}
