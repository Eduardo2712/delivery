import { IsNotEmpty, IsEmail, IsString, MaxLength, Length, Validate } from "class-validator";
import { MessagesHelper } from "src/helpers/message.helpers";

export class CreateAdminDto {
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
    @Length(6, 30, { message: MessagesHelper.PASSWORD_VALID })
    password: string;

    @IsNotEmpty()
    @Length(6, 30)
    @Validate(
        function (this: CreateAdminDto) {
            return this.password === this.confirm_password;
        },
        { message: MessagesHelper.CONFIRM_PASSWORD }
    )
    confirm_password: string;
}
