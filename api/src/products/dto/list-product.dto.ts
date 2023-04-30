import { IsNumber } from "class-validator";

export class ListProductDto {
    @IsNumber()
    id_type: number;
}
