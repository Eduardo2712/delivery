import axios from "./axios.config";

export const get = () => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL_API}/dashboard`);
};
