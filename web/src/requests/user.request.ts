import axios from "axios";
import { Address, User } from "../types";

export const updateStatus = (props: { status: string }) => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/users/update`, props);
};

export const createUser = (props: any) => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/users`, props);
};
