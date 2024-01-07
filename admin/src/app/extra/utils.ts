import { formatNumber } from "@/utils/other";
import * as Yup from "yup";

export const schemaCreate = Yup.object().shape({
    ext_name: Yup.string().required("Fill in this field!"),
    ext_status: Yup.string().required("Fill in this field!"),
    ext_price: Yup.string().required("Fill in this field!"),
    picture: Yup.mixed().required("Fill in this field!")
});

export const schemaUpdate = Yup.object().shape({
    ext_name: Yup.string().required("Fill in this field!"),
    ext_price: Yup.string().required("Fill in this field!"),
    ext_status: Yup.string().required("Fill in this field!"),
    picture: Yup.mixed().test("is-picture-required", "Fill in this field!", function () {
        return this.parent.new_picture ? !!this.parent.picture : true;
    })
});

export const createFormData = <T extends Record<string, any>>(values: T): FormData => {
    const form_data = new FormData();

    for (const [key, value] of Object.entries(values)) {
        let value_form_data = value;

        if (key === "ext_price") {
            value_form_data = formatNumber(value);
        }

        if ((key === "picture" && values.picture) || key !== "picture") {
            form_data.append(key, value_form_data);
        }
    }

    return form_data;
};

export const router_base = "/extra";
