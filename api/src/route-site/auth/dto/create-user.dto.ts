import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, Validate } from "class-validator";
import { validateCPF } from "src/helpers/other.helper";
import { cepRegex, passwordRegex, phoneRegex } from "src/helpers/regex.helper";

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
    @Validate((value: string) => phoneRegex.test(value), { message: "Invalid phone number" })
    use_phone: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @Validate((value: string) => cepRegex.test(value), { message: "Invalid CEP" })
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
    @MaxLength(50)
    @Validate((value: string) => passwordRegex.test(value), { message: "Invalid password" })
    password: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @Validate((value: string) => passwordRegex.test(value), { message: "Invalid password confirmation" })
    password_confirmation: string;
}
