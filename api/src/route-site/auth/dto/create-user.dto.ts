import { IsNotEmpty, IsString, MaxLength, Validate } from "class-validator";
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
    use_phone: string;
    email: Date;
    usa_cep: string;
    usa_street: string;
    usa_number: string;
    usa_neighborhood: string;
    usa_complement: string;
    usa_city: string;
    usa_state: string;
    password: string;
    password_confirmation: string;
}
