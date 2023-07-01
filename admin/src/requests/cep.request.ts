import axios from "./axios.config";

export const getCEP = async (cep: string) => {
    return axios.get(`https://viacep.com.br/ws/${cep}/json`);
};
