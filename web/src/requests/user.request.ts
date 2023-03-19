import axios from "axios";
import { User } from "../types";

export const createUser = (props: any) => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/users`, props);
};
