import { Address } from "./address.type";
import { File } from "./file.type";

export class User {
    id?: number;
    use_id_type_user: number;
    use_id_photo?: number;
    use_name: string;
    use_username: string;
    email: string;
    use_phone: string;
    use_date_birth: string | Date;
    password: string;
    use_delete: boolean;
    created_at?: Date;
    updated_at?: Date;
    photo?: File;
    address: Address;
}
