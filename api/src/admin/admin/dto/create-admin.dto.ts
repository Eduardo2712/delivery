import { IsNotEmpty, Matches, IsEmail } from "class-validator";
import { Admin } from "src/entities/admin.entity";
import { MessagesHelper } from "src/helpers/message.helpers";
import { RegExHelper } from "src/helpers/regex.helper";

export class CreateAdminDto extends Admin {
    @IsNotEmpty()
    adm_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    adm_phone: string;

    @IsNotEmpty()
    @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
    password: string;
}
