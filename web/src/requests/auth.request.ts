import axios from "axios";
import { User } from "../types";

export const auth = (props: Pick<User, "email" | "password">) => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/login`, props);
};
