import axios from "axios";
import { User } from "../types";

export const createUser = (props: Omit<User, "use_delete">) => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/users`, props);
};
