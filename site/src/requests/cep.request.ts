export const getCEP = async (cep: string) => {
    return await fetch(`https://viacep.com.br/ws/${cep}/json`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
};
