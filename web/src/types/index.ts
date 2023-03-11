export type ContextLogin = {
    auth: boolean;
    user: User | null;
    loading: boolean;
    logout: () => void;
    login: (email: string, password: string) => Promise<unknown>;
};

export type User = {
    id: number;
    use_id_type_user: number;
    use_name: string;
    email: string;
    use_phone: string;
    use_date_birth: Date;
    password: string;
    use_date_status: Date | null;
    use_delete: boolean;
    use_text_status: string | null;
    use_id_photo: number | null;
    photo: File;
    posts: Post[];
    created_at: Date;
    updated_at: Date;
};

export type Post = {
    id: number;
    pos_id_user: number;
    pos_text: string;
    pos_delete: boolean;
    created_at: Date;
    updated_at: Date;
};

export type File = {
    id: number;
    fil_size: number;
    fil_name: string;
    fil_delete: boolean;
    fil_path: string;
    created_at: Date;
    updated_at: Date;
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
    created_at: Date;
    updated_at: Date;
};
