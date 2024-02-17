import { ProductCreateType, ProductUpdateType } from "@/types/request/product.type";
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

export const createFormData = (values: Partial<ProductUpdateType> & ProductCreateType): FormData => {
    const form_data = new FormData();

    for (const [key, value] of Object.entries(values)) {
        let value_form_data = value;

        if (key === "pro_price") {
            value_form_data = formatNumber(value as string);
        } else if ((key === "picture" && !values.picture) || key === "extras") {
            continue;
        }

        form_data.append(key, value_form_data as string);
    }

    if (values.extras.length > 0) {
        values.extras.forEach((extra, index) => {
            form_data.append(`extras[${index}][id]`, extra.id.toString());

            if (extra.id_old) {
                form_data.append(`extras[${index}][id_old]`, extra.id_old.toString());
            }
        });
    }

    return form_data;
};

export const router_base = "/product";
