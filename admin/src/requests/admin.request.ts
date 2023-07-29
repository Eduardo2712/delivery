import { GetDatatableRequestType } from "@/types/request/admin.type";
import axios from "./axios.config";
import { AxiosPromise } from "axios";

export const getDatatable = ({ search, page, rows_per_page }: GetDatatableRequestType) => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/admin/list-all`, { params: { search, page, rows_per_page } });
};

export const remove = (id: number): AxiosPromise => {
    return axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/admin/${id}`);
};
