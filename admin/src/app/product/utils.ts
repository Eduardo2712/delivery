import { formatNumber } from "@/utils/other";
import * as Yup from "yup";

export const schemaCreate = Yup.object().shape({
    pro_name: Yup.string().required("Fill in this field!"),
    pro_description: Yup.string().required("Fill in this field!"),
    pro_id_category: Yup.string().required("Fill in this field!"),
    pro_ingredients: Yup.string().required("Fill in this field!"),
    pro_number_people: Yup.number().min(1, "Must contain at least 1 person!").required("Fill in this field!"),
    pro_status: Yup.string().required("Fill in this field!"),
    pro_price: Yup.string().required("Fill in this field!"),
    pictures: Yup.array().min(1, "You must upload at least 1 picture!").required("Fill in this field!")
});

export const schemaUpdate = Yup.object()
    .shape({
        pro_name: Yup.string().required("Fill in this field!"),
        pro_description: Yup.string().required("Fill in this field!"),
        pro_id_category: Yup.string().required("Fill in this field!"),
        pro_ingredients: Yup.string().required("Fill in this field!"),
        pro_number_people: Yup.number().min(1, "Must contain at least 1 person!").required("Fill in this field!"),
        pro_price: Yup.string().required("Fill in this field!"),
        pro_status: Yup.string().required("Fill in this field!"),
        pictures: Yup.array(),
        pictures_old: Yup.array(),
        pictures_delete: Yup.array()
    })
    .test("pictures", "You must upload at least 1 picture!", (value) => {
        const pictures = value.pictures ?? [];
        const pictures_old = value.pictures_old ?? [];

        return pictures?.length > 0 || pictures_old?.length > 0;
    });

export const createFormData = <T extends Record<string, any>>(values: T): FormData => {
    const form_data = new FormData();

    for (const [key, value] of Object.entries(values)) {
        if (!["pictures", "pictures_delete"].includes(key)) {
            let value_form_data = value;

            if (key === "pro_price") {
                value_form_data = formatNumber(value);
            }

            form_data.append(key, value_form_data);
        }
    }

    for (let i = 0; i < values.pictures.length; i++) {
        form_data.append(`pictures`, values.pictures[i]);
    }

    if (values?.pictures_delete) {
        for (let i = 0; i < values.pictures_delete.length; i++) {
            form_data.append(`pictures_delete[${i}]`, values.pictures_delete[i]);
        }
    }

    return form_data;
};

export const router_base = "/product";
