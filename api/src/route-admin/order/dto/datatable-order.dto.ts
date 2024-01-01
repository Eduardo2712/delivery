import { IsNumberString, IsOptional, IsString } from "class-validator";

export class DatatableOrderDto {
    @IsString()
    @IsOptional()
    search: string;

    @IsNumberString()
    @IsOptional()
    rows_per_page: number = 10;

    @IsNumberString()
    @IsOptional()
    page: number = 1;

    @IsNumberString()
    @IsOptional()
    id_user: number;
}
