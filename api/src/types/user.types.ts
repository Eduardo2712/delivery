export type UserType = {
    id?: number;
    email: string;
    use_name: string;
    password?: string;
    use_id_photo?: number;
    use_phone: string;
    use_cpf: string;
    use_date_birth: Date;
    use_delete: boolean;
    created_at: Date;
    updated_at: Date;
};

export type UserPayloadType = {
    sub: number;
    email: string;
    use_name: string;
};

export type UserTokenType = {
    access_token: string;
};

export type UserFromJwtType = {
    id: number;
    email: string;
    use_name: string;
};
