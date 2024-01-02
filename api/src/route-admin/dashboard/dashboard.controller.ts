import { Controller, Get } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller()
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    async get(): Promise<{
        admin_count: number;
        user_count: number;
        product_count: number;
        order_count: number;
        value_amount: number;
        extra_count: number;
    }> {
        return await this.dashboardService.get();
    }
}
