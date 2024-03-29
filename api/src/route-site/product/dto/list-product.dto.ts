import { IsNumberString, IsOptional, IsString } from "class-validator";

export class ListProductDto {
    @IsNumberString()
    @IsOptional()
    id_category: number | null;

    @IsString()
    @IsOptional()
    search: string | null;

    @IsNumberString()
    page: number;
}
