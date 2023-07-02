import { TypeFormRegister } from "@/app/auth/register/utils";
import axios from "./axios.config";

export const createUser = (props: TypeFormRegister) => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/users`, props);
};
