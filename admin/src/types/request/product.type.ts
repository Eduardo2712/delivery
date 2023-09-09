export type ProductDatatableType = {
    search: string;
    page: number;
    rows_per_page: number;
};

export type ProductCreateType = {
    email: string;
    adm_phone: string;
    adm_name: string;
    adm_status: string;
    password: string;
    confirm_password: string;
    picture?: File;
};

export type ProductUpdateType = {
    adm_phone: string;
    adm_name: string;
    adm_status: string;
    password?: string;
    confirm_password?: string;
    email?: string;
    picture?: File;
    new_picture: boolean;
};
