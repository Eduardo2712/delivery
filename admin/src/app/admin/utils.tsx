import * as Yup from "yup";

export const schemaCreate = Yup.object().shape({
    email: Yup.string().email("Fill in a valid e-mail!").required("Fill in this field!"),
    password: Yup.string().min(6, "Must contain at least 6 characters!").required("Fill in this field!"),
    confirm_password: Yup.string()
        .required("Fill in this field!")
        .oneOf([Yup.ref("password"), ""], "Passwords must match!"),
    adm_name: Yup.string().required("Fill in this field!"),
    adm_phone: Yup.string().min(14, "Must contain at least 14 characters!").required("Fill in this field!"),
    adm_status: Yup.number().required("Fill in this field!")
});

export const schemaUpdate = Yup.object().shape({
    current_password: Yup.string().min(6, "Must contain at least 6 characters!"),
    new_password: Yup.string().oneOf([Yup.ref("password"), ""], "Passwords must match!"),
    adm_name: Yup.string().required("Fill in this field!"),
    adm_phone: Yup.string().min(14, "Must contain at least 14 characters!").required("Fill in this field!"),
    adm_status: Yup.number().required("Fill in this field!")
});

export const router_base = "/admin";
