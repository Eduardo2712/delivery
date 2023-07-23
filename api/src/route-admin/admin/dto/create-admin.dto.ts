import { IsNotEmpty, Matches, IsEmail } from "class-validator";
import { AdminEntity } from "src/entities/admin.entity";
import { MessagesHelper } from "src/helpers/message.helpers";
import { RegExHelper } from "src/helpers/regex.helper";

export class CreateAdminDto extends AdminEntity {
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
