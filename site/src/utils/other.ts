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
