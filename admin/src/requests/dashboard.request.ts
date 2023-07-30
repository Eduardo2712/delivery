import { AxiosPromise } from "axios";
import axios from "./axios.config";
import { DashboardReturnType } from "@/types/request/dashboard.type";

export const get = (): AxiosPromise<DashboardReturnType & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/dashboard`);
};
