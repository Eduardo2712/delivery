import { Module } from "@nestjs/common";
import { ExtraService } from "./extra.service";
import { ExtraController } from "./extra.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExtraEntity } from "src/entities/extra.entity";
import { FileEntity } from "src/entities/file.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ExtraEntity, FileEntity])],
    controllers: [ExtraController],
    providers: [ExtraService],
    exports: [ExtraService]
})
export class ExtraModule {}
