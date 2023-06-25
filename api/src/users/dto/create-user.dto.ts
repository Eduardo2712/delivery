import { IsEmail, IsString, MaxLength, Length, IsDateString } from "class-validator";
import { User } from "../../models/user.model";

export class CreateUserDto extends User {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @Length(6, 20)
    password: string;

    @IsString()
    @Length(6, 20)
    password_confirmation: string;

    @IsString()
    @MaxLength(255)
    use_name: string;

    @IsString()
    @MaxLength(255)
    use_phone: string;

    @IsString()
    @MaxLength(255)
    use_cpf: string;

    @IsDateString()
    use_date_birth: Date;

    @IsString()
    @Length(9)
    usa_cep: string;

    @IsString()
    @MaxLength(255)
    usa_street: string;

    @IsString()
    @MaxLength(255)
    usa_number: string;

    @IsString()
    @MaxLength(255)
    usa_district: string;

    @IsString()
    @MaxLength(255)
    usa_complement?: string | null;

    @IsString()
    @MaxLength(255)
    usa_city: string;

    @IsString()
    @MaxLength(255)
    usa_state: string;
}
