import { FileType, OrderType, UserType } from "../entity/entity.type";

export type UserDatatableType = {
    search: string;
    page: number;
    rows_per_page: number;
};

export type UserCreateType = {
    email: string;
    use_name: string;
    use_date_birth: Date;
    use_phone: string;
    password: string;
    confirm_password: string;
    use_cpf: string;
};

export type UserUpdateType = {
    email?: string;
    use_name: string;
    use_date_birth: Date;
    use_phone: string;
    password: string;
    confirm_password: string;
    use_cpf: string;
};

export type UserGetType = UserType & { picture: FileType } & { orders: OrderType[] };
