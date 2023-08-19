import { UserDatatableType, UserType } from "@/types/request/user.type";
import axios from "./axios.config";
import { AxiosPromise } from "axios";

export const getDatatable = ({ search, page, rows_per_page }: UserDatatableType) => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/user/list-all`, { params: { search, page, rows_per_page } });
};

export const remove = (id: number): AxiosPromise<Error> => {
    return axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/user/${id}`);
};

export const get = (id: number): AxiosPromise<UserType & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/user/${id}`);
};
