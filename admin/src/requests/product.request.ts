import { ProductDatatableType } from "@/types/request/product.type";
import axios from "./axios.config";
import { AxiosPromise } from "axios";
import { ProductType } from "@/types/entity/entity.type";

export const getDatatable = ({ search, page, rows_per_page }: ProductDatatableType): AxiosPromise<ProductType[] & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/product/datatable`, { params: { search, page, rows_per_page } });
};

export const remove = (id: number): AxiosPromise<Error> => {
    return axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/product/${id}`);
};

export const create = (data: FormData): AxiosPromise<Error> => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/product`, data);
};

export const edit = (id: number, data: FormData): AxiosPromise<Error> => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/product/${id}`, data);
};

export const get = (id: number): AxiosPromise<ProductType & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/product/${id}`);
};
