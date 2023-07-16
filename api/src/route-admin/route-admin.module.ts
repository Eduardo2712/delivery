import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admin/admin.module";
import { DashboardModule } from "./dashboard/dashboard.module";

@Module({
    controllers: [],
    providers: [],
    imports: [AuthModule, AdminModule, DashboardModule]
})
export class RouteAdminModule {}
