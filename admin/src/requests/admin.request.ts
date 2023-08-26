import { AdminCreateType, AdminDatatableType, AdminType, AdminUpdateType } from "@/types/request/admin.type";
import axios from "./axios.config";
import { AxiosPromise } from "axios";

export const getDatatable = ({ search, page, rows_per_page }: AdminDatatableType): AxiosPromise<AdminType[] & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/admin/list-all`, { params: { search, page, rows_per_page } });
};

export const remove = (id: number): AxiosPromise<Error> => {
    return axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/admin/${id}`);
};

export const create = (data: FormData): AxiosPromise<Error> => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/admin`, data);
};

export const edit = (id: number, data: AdminUpdateType): AxiosPromise<Error> => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/admin/${id}`, data);
};

export const get = (id: number): AxiosPromise<AdminType & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/admin/${id}`);
};
