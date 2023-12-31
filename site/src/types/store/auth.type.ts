export type AuthStoreType = {
    user: UserStoreType | null;
    token: string | null;
    refresh_token: string | null;
};

export type UserStoreType = {
    id: number;
    email: string;
    use_name: string;
    use_date_birth: Date;
    use_phone: string;
    password?: string | null;
    use_cpf: string;
    use_active: boolean;
    use_id_picture?: number | null;
    created_at: Date;
    updated_at: Date;
};
