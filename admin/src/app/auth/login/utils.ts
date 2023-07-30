import * as Yup from "yup";

export const schema = Yup.object().shape({
    email: Yup.string().email("Fill in a valid e-mail!").required("Fill in this field!"),
    password: Yup.string().min(6, "Must contain at least 6 characters!").required("Fill in this field!")
});
