export type AdminDatatableRequestType = {
    search: string;
    page: number;
    rows_per_page: number;
};

export type AdminCreateRequestType = {
    email: string;
    password: string;
    adm_phone: string;
    adm_name: string;
    confirm_password: string;
};
