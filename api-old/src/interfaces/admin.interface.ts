import { Request } from "express";
import { AdminType } from "src/types/admin.type";

export interface AdminRequestInterface extends Request {
    user: AdminType;
}
