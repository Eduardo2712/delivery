import { User } from "../types";
import axios from "./axios.config";

export const auth = (props: Pick<User, "email" | "password">) => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/login`, props);
};
