export type AdminType = {
    id?: number;
    email: string;
    adm_name: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type AdminPayloadType = {
    sub: number;
    email: string;
    adm_name: string;
};

export type AdminTokenType = {
    access_token: string;
};

export type AdminFromJwtType = {
    id: number;
    email: string;
    adm_name: string;
};
