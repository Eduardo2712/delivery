import { ProductType } from "@/types/entity/entity.type";
import axios from "./axios.config";
import { AxiosPromise } from "axios";

export const list = (data: { search: string; id_category: number | null }): AxiosPromise<ProductType[] & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/product/list`, { params: data });
};
