export const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(value);
};

export const formatDecimal = (value: number) => {
    return formatBRL(value).replace("R$", "");
};

export const formatNumber = (value: string) => {
    value = value.replace(/\s/g, "").replace("R$", "");

    value = value.replaceAll(".", "");
    value = value.replaceAll(",", ".");

    return value;
};

export const validateCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]/g, "");

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let sum = 0;
    let remainder = 0;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf[i - 1]) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;

    if (remainder !== parseInt(cpf[9])) {
        return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf[i - 1]) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;

    if (remainder !== parseInt(cpf[10])) {
        return false;
    }

    return true;
};
