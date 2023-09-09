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

export type OrderType = {
    id: number;
    ord_id_user: number;
    ord_delivey_fee: number;
    ord_cep: string;
    ord_street: string;
    ord_number: string;
    ord_complement: string;
    ord_neighborhood: string;
    ord_city: string;
    ord_state: string;
    ord_delivered: boolean;
    ord_confirmed_payment: boolean;
    ord_delivery: boolean;
    ord_active: boolean;
    created_at: Date;
    updated_at: Date;
};

export type ProductType = {
    id: number;
    pro_id_type: number;
    pro_name: string;
    pro_description: string;
    pro_price: number;
    pro_active: boolean;
    created_at: Date;
    updated_at: Date;
};
