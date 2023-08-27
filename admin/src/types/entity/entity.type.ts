export type AdminType = {
    id: number;
    email: string;
    adm_id_picture: number | null;
    adm_phone: string;
    password: string | null | undefined;
    adm_name: string;
    adm_status: boolean;
    adm_active: boolean;
    created_at: Date;
    updated_at: Date;
    picture?: FileType | null;
};

export type FileType = {
    id: number;
    fil_url: string;
    fil_name: string;
    fil_size: number;
    fil_mimetype: string;
    created_at: Date;
    updated_at: Date;
};
