import { Prisma } from "@prisma/client";

export class User implements Prisma.UserCreateManyInput, Prisma.UserAddressCreateManyUserInput {
    id?: number;
    email: string;
    use_date_birth: string | Date;
    use_id_address: number;
    use_id_photo?: number;
    use_id_type_user: number;
    use_name: string;
    use_phone: string;
    password: string;
    use_cpf: string;
    usa_cep: string;
    usa_city: string;
    usa_complement?: string;
    usa_district: string;
    usa_number: string;
    usa_state: string;
    usa_street: string;
}
