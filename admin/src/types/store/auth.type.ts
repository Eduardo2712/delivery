export type AuthStoreType = {
    user: AdminStoreType | null;
    token: string | null;
};

export type PictureStoreType = {
    id: number;
    fil_url: string;
    created_at: Date;
    updated_at: Date;
};

export type AdminStoreType = {
    id: number;
    adm_id_picture: number;
    adm_name: string;
    email: string;
    adm_phone: string;
    password: string;
    adm_delete: boolean;
    created_at: Date;
    updated_at: Date;
    picture: PictureStoreType;
};
