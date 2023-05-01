import { IsArray, IsString } from "class-validator";

export class ListProductDto {
    @IsArray()
    id_type: number[];

    @IsString()
    search: string;
}
