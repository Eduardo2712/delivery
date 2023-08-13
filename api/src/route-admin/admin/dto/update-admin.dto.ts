import { IsNotEmpty, IsString, MaxLength, IsBooleanString, IsOptional, IsEmail, Length, ValidateIf, Validate } from "class-validator";
import { MessagesHelper } from "src/helpers/message.helpers";

export class UpdateAdminDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    adm_name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    adm_phone: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsBooleanString()
    adm_status: boolean;

    @IsOptional()
    @Length(6, 30)
    @ValidateIf((_, value) => value !== "")
    password?: string;

    @IsOptional()
    @Length(6, 30)
    @ValidateIf((_, value) => value !== "")
    @Validate(
        function (this: UpdateAdminDto) {
            return this.password === this.confirm_password;
        },
        { message: MessagesHelper.CONFIRM_PASSWORD }
    )
    confirm_password?: string;
}
