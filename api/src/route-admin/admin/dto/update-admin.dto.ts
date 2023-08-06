import { IsNotEmpty, IsString, MaxLength, Validate, IsBooleanString, IsOptional, IsEmail, Length, ValidateIf } from "class-validator";
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
    current_password?: string;

    @IsOptional()
    @Length(6, 30)
    @ValidateIf((_, value) => value !== "")
    @Validate(
        function (value: string, args: any) {
            const currentPassword = args.object["current_password"];
            if (!currentPassword || value !== currentPassword) {
                return true;
            }
            return false;
        },
        { message: MessagesHelper.CONFIRM_NEW_PASSWORD }
    )
    new_password?: string;
}
