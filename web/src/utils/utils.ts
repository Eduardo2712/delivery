import axios from "axios";

export const maskCEP = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    e.target.value = value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{3})\d+$/, "$1");
    return e;
};

export const maskCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    e.target.value = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+$/, "$1");
    return e;
};

export const maskMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    e.target.value = value
        .replace(/\D/g, "")
        .replace(/(\d)(\d{2})$/, "$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g, ".");
    return e;
};

export const maskPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    e.target.value = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
        .replace(/(-\d{4})\d+$/, "$1");
    return e;
};

export const getCEP = async (cep: string) => {
    return await axios.get(`https://viacep.com.br/ws/${cep}/json`);
};
