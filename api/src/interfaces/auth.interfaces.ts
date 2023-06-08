import { UserType } from "src/types/user.types";
import { Request } from "express";

export interface AuthRequestInterface extends Request {
    user: UserType;
}
