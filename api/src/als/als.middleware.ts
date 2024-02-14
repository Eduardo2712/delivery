import { Injectable, NestMiddleware } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AlsMiddleware implements NestMiddleware {
    constructor(private readonly als: AsyncLocalStorage<any>) {}
    use(req: Request, _: Response, next: NextFunction) {
        const authorization = req.headers["authorization"];

        if (!authorization) {
            return this.als.run({}, () => next());
        }

        const token = authorization.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (!decoded) {
                return this.als.run({}, () => next());
            }

            this.als.run(decoded, () => next());
        } catch (error) {
            return this.als.run({}, () => next());
        }
    }
}
