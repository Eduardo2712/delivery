import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, Validate } from "class-validator";
import { validateCPF } from "src/helpers/other.helper";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    use_name: string;

    @IsNotEmpty()
    @IsString()
    @Validate(validateCPF, { message: "Invalid CPF" })
    use_cpf: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(11)
    use_phone: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    usa_cep: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    usa_street: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    usa_number: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    usa_neighborhood: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    usa_complement: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    usa_city: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    usa_state: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    password: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    password_confirmation: string;
}
