import axios from "./axios.config";

export const list = () => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/category/list`);
};
