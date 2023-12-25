import { IsEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class DatatableProductDto {
    @IsString()
    @IsEmpty()
    @IsOptional()
    search: string;

    @IsNumberString()
    @IsOptional()
    rows_per_page: number = 10;

    @IsNumberString()
    @IsOptional()
    page: number = 1;
}
