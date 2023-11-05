import { OrderType } from "../entity/entity.type";

export type OrderDatatableType = {
    search: string;
    page: number;
    rows_per_page: number;
    id_user?: number | null;
};

export type OrderGetType = OrderType;
