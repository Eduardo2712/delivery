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

export type UserType = {
    id: number;
    email: string;
    use_name: string;
    use_date_birth: Date;
    use_phone: string;
    password: string;
    use_cpf: string;
    use_active: boolean;
    use_id_picture?: number | null;
    created_at: Date;
    updated_at: Date;
};
