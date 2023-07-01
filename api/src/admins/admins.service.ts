import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";

@Injectable()
export class AdminsService {
    create(createAdminDto: CreateAdminDto) {
        return "This action adds a new admin";
    }
}
