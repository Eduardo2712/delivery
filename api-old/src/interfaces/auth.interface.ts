import { UserType } from "src/types/user.type";
import { Request } from "express";

export interface AuthRequestInterface extends Request {
    user: UserType;
}
