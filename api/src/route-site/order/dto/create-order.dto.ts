import { IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    @Length(9)
    ord_cep: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    ord_street: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    ord_number: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    ord_neighborhood: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    ord_city: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    ord_state: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    ord_complement: string;
}
