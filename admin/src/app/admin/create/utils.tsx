import * as Yup from "yup";

export const schema = Yup.object().shape({
    email: Yup.string().email("Fill in a valid e-mail!").required("Fill in this field!"),
    password: Yup.string().min(6, "Must contain at least 6 characters!").required("Fill in this field!"),
    confirm_password: Yup.string()
        .required("Fill in this field!")
        .oneOf([Yup.ref("password"), ""], "Passwords must match!"),
    adm_name: Yup.string().required("Fill in this field!"),
    adm_phone: Yup.string().min(11, "Must contain at least 11 characters!").required("Fill in this field!")
});
