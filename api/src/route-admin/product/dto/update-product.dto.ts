import { IsBooleanString, IsDecimal, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateProductDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    pro_name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    pro_description: string;

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
