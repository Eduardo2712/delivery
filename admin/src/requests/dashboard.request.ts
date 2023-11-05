import { AxiosPromise } from "axios";
import axios from "./axios.config";
import { DashboardGetType } from "@/types/request/dashboard.type";

export const get = (): AxiosPromise<DashboardGetType & Error> => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/dashboard`);
};
