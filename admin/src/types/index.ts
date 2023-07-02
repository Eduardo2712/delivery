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
