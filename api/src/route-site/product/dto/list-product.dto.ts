import { IsEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ListProductDto {
    @IsNumber()
    @IsEmpty()
    @IsOptional()
    id_category: number | null;

    @IsString()
    @IsEmpty()
    @IsOptional()
    search: string | null;
}
