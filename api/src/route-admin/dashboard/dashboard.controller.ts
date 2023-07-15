import { BadRequestException, Controller, Get } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller("admin/dashboard")
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    async get() {
        try {
            return await this.dashboardService.get();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }

            throw new BadRequestException("Error");
        }
    }
}
