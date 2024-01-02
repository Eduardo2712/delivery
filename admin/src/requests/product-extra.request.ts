import axios from "./axios.config";
import { AxiosPromise } from "axios";
import { AdminType } from "@/types/entity/entity.type";
import { ProductExtraDatatableType } from "@/types/request/product-extra.type";

export const getDatatable = ({ search, page, rows_per_page }: ProductExtraDatatableType): AxiosPromise<AdminType[] & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/product-extra/datatable`, { params: { search, page, rows_per_page } });
};
