import { ExtraType, ProductType } from "../entity/entity.type";

export type ProductDatatableType = {
    search: string;
    page: number;
    rows_per_page: number;
};

export type ProductCreateType = {
    pro_name: string;
    pro_id_category: number | null;
    pro_ingredients: string;
    pro_number_people: number;
    pro_price: number | string;
    pro_status: number | string;
    picture?: File;
    extras: ExtraType[];
};

export type ProductUpdateType = {
    pro_name: string;
    pro_id_category: number | null;
    pro_ingredients: string;
    pro_number_people: number;
    pro_price: number | string;
    pro_status: number | string;
    picture?: File;
    new_picture: boolean;
    extras: Array<ExtraType & { id_old?: number }>;
    extras_deleted: number[];
};

export type ProductGetType = ProductType;
