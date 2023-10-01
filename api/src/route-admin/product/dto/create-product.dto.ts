import { IsBooleanString, IsDecimal, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateProductDto {
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
}
