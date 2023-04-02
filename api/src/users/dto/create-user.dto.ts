import { IsEmail, IsString, MaxLength, MinLength, IsDateString, ValidateNested, IsObject } from "class-validator";
import { User } from "../entities/user.entity";
import { Type } from "class-transformer";

export class CreateUserDto extends User {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsString()
    password: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsString()
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

    usa_cep: string;
    usa_street: string;
    usa_number: string;
    usa_district: string;
    usa_complement?: string | null;
    usa_city: string;
    usa_state: string;
}
