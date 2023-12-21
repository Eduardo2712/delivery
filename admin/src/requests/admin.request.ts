import { AdminDatatableType, AdminGetType } from "@/types/request/admin.type";
import axios from "./axios.config";
import { AxiosPromise } from "axios";
import { AdminType } from "@/types/entity/entity.type";

export const getDatatable = ({ search, page, rows_per_page }: AdminDatatableType): AxiosPromise<AdminType[] & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/admin/datatable`, { params: { search, page, rows_per_page } });
};

export const remove = (id: number): AxiosPromise<Error> => {
    return axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/admin/${id}`);
};

export const create = (data: FormData): AxiosPromise<Error> => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/admin`, data);
};

export const edit = (id: number, data: FormData): AxiosPromise<Error> => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/admin/${id}`, data);
};

export const get = (id: number): AxiosPromise<AdminGetType & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/admin/${id}`);
};
