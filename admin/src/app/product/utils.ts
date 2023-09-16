import * as Yup from "yup";

export const schemaCreate = Yup.object().shape({
    pro_name: Yup.string().required("Fill in this field!"),
    pro_description: Yup.string().required("Fill in this field!"),
    pro_price: Yup.string().required("Fill in this field!"),
    pictures: Yup.array().min(1, "You must upload at least 1 picture!").required("Fill in this field!")
});

export const schemaUpdate = Yup.object().shape({
    pro_name: Yup.string().required("Fill in this field!"),
    pro_description: Yup.string().required("Fill in this field!"),
    pro_price: Yup.string().required("Fill in this field!")
});

export const createFormData = <T extends Record<string, any>>(values: T): FormData => {
    const form_data = new FormData();

    for (const [key, value] of Object.entries(values)) {
        if (key !== "pictures") {
            let value_form_data = value;

            if (key === "pro_price") {
                value_form_data = value.toString().replace(",", ".").replace(".", "");
            }

            form_data.append(key, value_form_data);
        }
    }

    if (values.pictures) {
        for (let i = 0; i < values.pictures.length; i++) {
            form_data.append(`pictures[${i}]`, values.pictures[i]);
        }
    }

    return form_data;
};

export const router_base = "/product";
