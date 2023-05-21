import axios from "axios";

export const getCEP = async (cep: string) => {
    return axios.get(`https://viacep.com.br/ws/${cep}/json`);
};
