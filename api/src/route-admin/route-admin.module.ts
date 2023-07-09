import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admin/admin.module";

@Module({
    controllers: [],
    providers: [],
    imports: [AuthModule, AdminModule]
})
export class RouteAdminModule {}
