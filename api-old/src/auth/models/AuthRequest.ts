import { Request } from "express";
import { User } from "src/types/user.type";

export interface AuthRequest extends Request {
    user: User;
}
