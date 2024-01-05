import { IsBooleanString, IsDecimal, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateExtraDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    ext_name: string;

    @IsNotEmpty()
    @IsDecimal({
        decimal_digits: "2"
    })
    @MaxLength(13)
    ext_price: number;

    @IsNotEmpty()
    @IsBooleanString()
    ext_status: boolean;

    @IsNotEmpty()
    @IsBooleanString()
    new_picture: boolean;
}
