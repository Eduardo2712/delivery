import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";

@Module({
    controllers: [],
    providers: [],
    imports: [AuthModule, CategoryModule]
})
export class RouteSiteModule {}
