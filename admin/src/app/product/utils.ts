import { formatNumber } from "@/utils/other";
import * as Yup from "yup";

export const schemaCreate = Yup.object().shape({
    pro_name: Yup.string().required("Fill in this field!"),
    pro_id_category: Yup.string().required("Fill in this field!"),
    pro_ingredients: Yup.string().required("Fill in this field!"),
    pro_number_people: Yup.number().min(1, "Must contain at least 1 person!").required("Fill in this field!"),
    pro_status: Yup.string().required("Fill in this field!"),
    pro_price: Yup.string().required("Fill in this field!"),
    picture: Yup.mixed().required("Fill in this field!")
});

export const schemaUpdate = Yup.object().shape({
    pro_name: Yup.string().required("Fill in this field!"),
    pro_id_category: Yup.string().required("Fill in this field!"),
    pro_ingredients: Yup.string().required("Fill in this field!"),
    pro_number_people: Yup.number().min(1, "Must contain at least 1 person!").required("Fill in this field!"),
    pro_price: Yup.string().required("Fill in this field!"),
    pro_status: Yup.string().required("Fill in this field!"),
    picture: Yup.mixed().test("is-picture-required", "Fill in this field!", function () {
        return this.parent.new_picture ? !!this.parent.picture : true;
    })
});

export const createFormData = <T extends Record<string, any>>(values: T): FormData => {
    const form_data = new FormData();

    for (const [key, value] of Object.entries(values)) {
        let value_form_data = value;

        if (key === "pro_price") {
            value_form_data = formatNumber(value);
        }

        if (key !== "picture" || (key === "picture" && values.new_picture)) {
            form_data.append(key, value_form_data);
        }
    }

    return form_data;
};

export const router_base = "/product";
