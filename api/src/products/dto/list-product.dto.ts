import { IsArray, IsNumber, IsString } from "class-validator";
import { Product } from "../../models/product.model";

export class ListProductDto extends Product {
    @IsArray()
    id_type_array: number[];

    @IsString()
    search: string;

    @IsNumber()
    page: number;
}
