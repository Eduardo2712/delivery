import { IsBooleanString, IsDecimal, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateProductDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    pro_name: string;

    @IsNotEmpty()
    @IsNumberString()
    pro_id_category: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    pro_description: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    pro_ingredients: string;

    @IsNotEmpty()
    @IsNumberString()
    pro_number_people: number;

    @IsNotEmpty()
    @IsDecimal({
        decimal_digits: "2"
    })
    @MaxLength(13)
    pro_price: number;

    @IsNotEmpty()
    @IsBooleanString()
    pro_status: boolean;

    @IsOptional()
    pictures_delete: number[];
}
