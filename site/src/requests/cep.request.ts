export const getCEP = async (cep: string) => {
    return await fetch(`https://viacep.com.br/ws/${cep}/json`);
};
