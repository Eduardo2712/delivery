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
    url?: string;
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
    password?: string;
    use_cpf: string;
    use_active: boolean;
    use_id_picture?: number | null;
    created_at: Date;
    updated_at: Date;
    picture: FileType;
    orders: OrderType[];
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
    ord_is_delivery: boolean;
    ord_delivery_fee: number;
    ord_active: boolean;
    created_at: Date;
    updated_at: Date;
    user: UserType;
    order_status: OrderStatusType[];
    items: ItemType[];
};

export type ProductType = {
    id: number;
    pro_name: string;
    pro_ingredients: string;
    pro_id_category: number;
    pro_number_people: number;
    pro_price: number;
    pro_active: boolean;
    pro_status: boolean;
    created_at: Date;
    updated_at: Date;
    image: FileType | null;
    histories?: ProductHistoryType[] | null;
};

export type ItemType = {
    id: number;
    ite_id_product: number;
    ite_id_order: number;
    ite_price: number;
    ite_comment: string;
    created_at: Date;
    updated_at: Date;
    product: ProductType;
};

export type ProductFileType = {
    id: number;
    prl_id_product: number;
    created_at: Date;
    updated_at: Date;
    picture?: FileType | null;
};

export type ProductHistoryType = {
    id: number;
    prh_id_product: number;
    prh_price: number;
    prh_date: Date;
    created_at: Date;
    updated_at: Date;
};

export type OrderStatusType = {
    id: number;
    ors_id_status: number;
    ors_id_order: number;
    ors_id_active: boolean;
    created_at: Date;
    updated_at: Date;
    status: StatusType;
};

export type StatusType = {
    id: number;
    sta_name: string;
    sta_color: string;
    created_at: Date;
    updated_at: Date;
};

export type CategoryType = {
    id: number;
    cat_name: string;
    cat_active: boolean;
    created_at: Date;
    updated_at: Date;
};

export type ProductExtra = {
    id: number;
    created_at: Date;
    updated_at: Date;
};
