import axios from "./axios.config";
import { AxiosPromise } from "axios";
import { CategoryType } from "@/types/entity/entity.type";

export const list = (): AxiosPromise<CategoryType[] & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/category/list`);
};
