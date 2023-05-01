import { IsArray } from "class-validator";

export class ListProductDto {
    @IsArray()
    id_type: number[];
}
