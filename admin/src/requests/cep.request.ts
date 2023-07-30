import { AxiosPromise } from "axios";
import axios from "./axios.config";

export const getCEP = <T>(cep: string): AxiosPromise<T & Error> => {
    return axios.get(`https://viacep.com.br/ws/${cep}/json`);
};
