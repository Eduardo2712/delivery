import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    IsDate
} from "class-validator";
import { User } from "../entities/user.entity";

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
    @MaxLength(255)
    use_name: string;

    use_phone: string;
    use_username: string;

    @IsDate()
    use_date_birth: Date;
}
