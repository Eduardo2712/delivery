import { IsEmail, IsNotEmpty } from "class-validator";
import { AdminEntity } from "src/entities/admin.entity";

export class CreateAuthDto extends AdminEntity {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
