import { IsEmail, IsNotEmpty } from "class-validator";
import { Admin } from "src/entities/admin.entity";

export class CreateAuthDto extends Admin {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
