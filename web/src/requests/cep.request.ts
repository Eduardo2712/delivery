import axios from "axios";

export const getCEP = async (cep: string) => {
    return await axios.get(`https://viacep.com.br/ws/${cep}/json`);
};
