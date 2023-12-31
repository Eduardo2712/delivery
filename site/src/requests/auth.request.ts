import { UserType } from "@/types/entity/entity.type";
import axios from "./axios.config";

export const auth = (props: Pick<UserType, "email" | "password">) => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/login`, props);
};
