import { CreateRequestType, GetDatatableRequestType } from "@/types/request/admin.type";
import axios from "./axios.config";
import { AxiosPromise } from "axios";

export const getDatatable = <T>({ search, page, rows_per_page }: GetDatatableRequestType): AxiosPromise<T[] & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/admin/list-all`, { params: { search, page, rows_per_page } });
};

export const remove = (id: number): AxiosPromise<Error> => {
    return axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/admin/${id}`);
};

export const create = (data: CreateRequestType): AxiosPromise<Error> => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/admin`, data);
};
