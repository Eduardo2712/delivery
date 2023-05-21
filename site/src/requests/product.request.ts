import axios from "axios";

type Props = {
    id_type_array: number[];
    search: string;
};

export const listProducts = (props: Props) => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API}/products/list`, props);
};
