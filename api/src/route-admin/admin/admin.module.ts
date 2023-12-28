import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/entities/admin.entity";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { FileEntity } from "src/entities/file.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity, FileEntity])],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService]
})
export class AdminModule {}
