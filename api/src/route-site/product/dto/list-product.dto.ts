import { IsEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class ListProductDto {
    @IsNumberString()
    @IsEmpty()
    @IsOptional()
    id_category: number | null;

    @IsString()
    @IsEmpty()
    @IsOptional()
    search: string | null;

    @IsNumberString()
    page: number;
}
