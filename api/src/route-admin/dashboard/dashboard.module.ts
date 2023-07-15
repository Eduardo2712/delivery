import { Module } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { DashboardController } from "./dashboard.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/entities/admin.entity";
import { User } from "src/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Admin, User])],
    controllers: [DashboardController],
    providers: [DashboardService]
})
export class DashboardModule {}
