export type AdminDatatableType = {
    search: string;
    page: number;
    rows_per_page: number;
};

export type AdminCreateType = {
    email: string;
    adm_phone: string;
    adm_name: string;
    adm_status: string;
    password: string;
    confirm_password: string;
};

export type AdminUpdateType = {
    adm_phone: string;
    adm_name: string;
    adm_status: string;
    password?: string;
    confirm_password?: string;
    email?: string;
};

export type AdminType = {
    id: number;
    email: string;
    adm_phone: string;
    password?: string | null;
    adm_name: string;
    adm_status: boolean;
    adm_active: boolean;
    created_at: Date;
    updated_at: Date;
    adm_id_picture?: number | null;
};
