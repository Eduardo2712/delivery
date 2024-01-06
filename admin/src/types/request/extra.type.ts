import { ExtraType } from "../entity/entity.type";

export type ExtraDatatableType = {
    search: string;
    page: number;
    rows_per_page: number;
};

export type ExtraCreateType = {
    ext_name: string;
    ext_price: number | string;
    ext_status: number | string;
    picture: File | undefined;
};

export type ExtraUpdateType = {
    ext_name: string;
    ext_price: number | string;
    ext_status: number | string;
    picture: File | undefined;
    new_picture: boolean;
};

export type ExtraGetType = ExtraType;
