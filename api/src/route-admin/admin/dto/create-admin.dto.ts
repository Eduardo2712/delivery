import { IsNotEmpty, Matches, IsEmail, IsString, MaxLength } from "class-validator";
import { AdminEntity } from "src/entities/admin.entity";
import { MessagesHelper } from "src/helpers/message.helpers";
import { RegExHelper } from "src/helpers/regex.helper";

export class CreateAdminDto extends AdminEntity {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    adm_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    adm_phone: string;

    @IsNotEmpty()
    @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
    password: string;
}
