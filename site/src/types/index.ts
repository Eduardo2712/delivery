export type User = {
    id: number;
    use_name: string;
    email: string;
    use_phone: string;
    use_date_birth: Date;
    password: string;
    use_delete: boolean;
    use_id_photo: number | null;
    photo: File;
    createdAt: Date;
    updatedAt: Date;
};

export type Address = {
    id: number;
    add_cep: string;
    add_street: string;
    add_number: string;
    add_district: string;
    add_complement: string;
    add_city: string;
    add_state: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Product = {
    id: number;
    pro_id_photo: number | null;
    pro_id_type: number;
    pro_price: number;
    pro_name: string;
    pro_description: string;
    pro_delete: boolean;
    createdAt: Date;
    updatedAt: Date;
    photo: Photo;
};

export type Photo = {
    id: number;
    pho_size: number;
    pho_name: string;
    pho_delete: boolean;
    pho_path: string;
    createdAt: Date;
    updatedAt: Date;
};
