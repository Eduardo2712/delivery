import { FileType, ProductType } from "../entity/entity.type";

export type ProductDatatableType = {
    search: string;
    page: number;
    rows_per_page: number;
};

export type ProductCreateType = {
    pro_name: string;
    pro_description: string;
    pro_price: number | string;
    pro_status: number | string;
    pictures?: File[];
};

export type ProductUpdateType = {
    pro_name: string;
    pro_description: string;
    pro_price: number | string;
    pro_status: number | string;
    pictures?: File[];
    pictures_old?: Array<{ id: number; [key: string]: any; file?: FileType }> | [];
    pictures_delete?: number[];
};

export type ProductGetType = ProductType;
