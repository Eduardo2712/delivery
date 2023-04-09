import { IsEmail, IsString, MaxLength, Length, IsDateString, Equals } from "class-validator";
import { Admin } from "../entities/admin.entity";

export class CreateAdminDto extends Admin {
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
    adm_name: string;

    @IsString()
    @MaxLength(255)
    adm_phone: string;

    @IsString()
    @MaxLength(255)
    adm_cnpj: string;

    @IsDateString()
    adm_date_birth: Date;

    @Equals(1)
    type: number;

    @IsString()
    @Length(9)
    ada_cep: string;

    @IsString()
    @MaxLength(255)
    ada_street: string;

    @IsString()
    @MaxLength(255)
    ada_number: string;

    @IsString()
    @MaxLength(255)
    ada_district: string;

    @IsString()
    @MaxLength(255)
    ada_complement?: string | null;

    @IsString()
    @MaxLength(255)
    ada_city: string;

    @IsString()
    @MaxLength(255)
    ada_state: string;
}
