export type AuthStoreType = {
    user: UserStoreType | null;
    token: string | null;
    refresh_token: string | null;
};

export type PictureStoreType = {
    id: number;
    fil_url: string;
    url?: string;
    created_at: Date;
    updated_at: Date;
};

export type UserStoreType = {
    id: number;
    email: string;
    use_name: string;
    use_birth_date: Date;
    use_phone: string;
    use_cpf: string;
    use_active: boolean;
    use_id_picture?: number | null;
    created_at: Date;
    updated_at: Date;
    picture?: PictureStoreType | null;
};
