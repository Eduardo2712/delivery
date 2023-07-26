import { GetDatatableRequestType } from "@/types/request/admin.type";
import axios from "./axios.config";

export const getDatatable = ({ search, page, rows_per_page }: GetDatatableRequestType) => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/admin/list-all`, { params: { search, page, rows_per_page } });
};
