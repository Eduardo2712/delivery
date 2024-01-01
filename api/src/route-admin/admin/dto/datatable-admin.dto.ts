import { IsNumberString, IsOptional, IsString } from "class-validator";

export class DatatableAdminDto {
    @IsString()
    @IsOptional()
    search: string;

    @IsNumberString()
    @IsOptional()
    rows_per_page: number = 10;

    @IsNumberString()
    @IsOptional()
    page: number = 1;
}
