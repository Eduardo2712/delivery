import { IsString } from "class-validator";

export class ListProductDto {
    @IsString()
    type: string;
}
