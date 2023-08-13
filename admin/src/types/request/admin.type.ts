export type AdminDatatableRequestType = {
    search: string;
    page: number;
    rows_per_page: number;
};

export type AdminCreateRequestType = {
    email: string;
    adm_phone: string;
    adm_name: string;
    adm_status: string;
    password: string;
    confirm_password: string;
};

export type AdminUpdateRequestType = {
    adm_phone: string;
    adm_name: string;
    adm_status: string;
    password?: string;
    confirm_password?: string;
    email?: string;
};
