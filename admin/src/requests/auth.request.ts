import { AuthRequestType } from "@/types/request/auth.type";
import axios from "./axios.config";

export const auth = (props: AuthRequestType) => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/auth/login`, props);
};
