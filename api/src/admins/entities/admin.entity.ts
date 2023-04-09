import { Prisma } from "@prisma/client";

export class Admin implements Prisma.AdminCreateManyInput, Prisma.AdminAddressCreateManyAdminInput {
    id?: number;
    email: string;
    adm_date_birth: string | Date;
    adm_id_address: number;
    adm_id_photo?: number;
    adm_id_type_user: number;
    adm_name: string;
    adm_phone: string;
    password: string;
    adm_cnpj: string;
    ada_cep: string;
    ada_city: string;
    ada_complement?: string;
    ada_district: string;
    ada_number: string;
    ada_state: string;
    ada_street: string;
}
