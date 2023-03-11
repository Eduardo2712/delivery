import { Prisma } from "@prisma/client";

export class User implements Prisma.UserUncheckedCreateInput {
    id?: number;
    email: string;
    use_date_birth: string | Date;
    use_id_address: number;
    use_id_photo?: number;
    use_id_type_user: number;
    use_name: string;
    use_phone: string;
    use_username: string;
    password: string;
    use_cpf: string;
    addresses?: Prisma.UserAddressUncheckedCreateNestedManyWithoutUserInput;
}
