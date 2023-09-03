import { OrderDatatableType } from "@/types/request/order.type";
import axios from "./axios.config";

export const getDatatable = ({ search, page, rows_per_page, id_user = null }: OrderDatatableType) => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/order/list-all`, { params: { search, page, rows_per_page, id_user } });
};
