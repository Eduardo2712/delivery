export const listYesNo = [
    { value: "1", label: "Yes" },
    { value: "0", label: "No" }
];

export const listEnableDisable = [
    { value: "1", label: "Enable" },
    { value: "0", label: "Disable" }
];

export const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(value);
};

export const formatNumber = (value: string) => {
    value = value.replace(/\s/g, "").replace("R$", "");

    value = value.replaceAll(".", "");
    value = value.replaceAll(",", ".");

    return value;
};
