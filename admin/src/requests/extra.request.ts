import axios from "./axios.config";
import { AxiosPromise } from "axios";
import { ExtraType } from "@/types/entity/entity.type";
import { ExtraDatatableType } from "@/types/request/extra.type";

export const getDatatable = ({ search, page, rows_per_page }: ExtraDatatableType): AxiosPromise<ExtraType[] & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/extra/datatable`, { params: { search, page, rows_per_page } });
};

export const remove = (id: number): AxiosPromise<Error> => {
    return axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/extra/${id}`);
};

export const create = (data: FormData): AxiosPromise<Error> => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/extra`, data);
};

export const edit = (id: number, data: FormData): AxiosPromise<Error> => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/extra/${id}`, data);
};

export const get = (id: number): AxiosPromise<ExtraType & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/extra/${id}`);
};

export const list = (search: string): AxiosPromise<ExtraType[] & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/extra/list`, {
        params: {
            search
        }
    });
};
