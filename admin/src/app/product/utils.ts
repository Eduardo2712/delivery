import * as Yup from "yup";

export const schemaCreate = Yup.object().shape({
    adm_name: Yup.string().required("Fill in this field!")
});

export const schemaUpdate = Yup.object().shape({
    adm_name: Yup.string().required("Fill in this field!")
});

export const createFormData = <T extends Record<string, any>>(values: T): FormData => {
    const form_data = new FormData();

    for (const [key, value] of Object.entries(values)) {
        if (key !== "picture" || (key === "picture" && values.picture)) {
            form_data.append(key, value);
        }
    }

    return form_data;
};

export const router_base = "/product";
