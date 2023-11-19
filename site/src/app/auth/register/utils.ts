import * as Yup from "yup";

export type TypeFormRegister = {
    email: string;
    password: string;
    password_confirmation: string;
    use_name: string;
    use_cpf: string;
    use_phone: string;
    use_date_birth: string;
    usa_cep: string;
    usa_street: string;
    usa_number: string;
    usa_neighborhood: string;
    usa_complement: string;
    usa_city: string;
    usa_state: string;
};

export const schema = (step: number) => {
    if (step === 0) {
        return Yup.object().shape({
            email: Yup.string().email("Fill in with a valid e-mail!").required("Fill in this field!"),
            password: Yup.string().min(8, "Password must be at least 8 characters long!").required("Fill in this field!"),
            password_confirmation: Yup.string()
                .min(8, "Password must be at least 8 characters long!")
                .oneOf([Yup.ref("password"), undefined], "Passwords must be the same!")
                .required("Fill in this field!"),
            use_name: Yup.string().required("Fill in this field!"),
            use_cpf: Yup.string().length(14).required("Fill in this field!"),
            use_phone: Yup.string().required("Fill in this field!"),
            use_date_birth: Yup.date().required("Fill in this field!")
        });
    } else if (step === 1) {
        return Yup.object().shape({
            usa_cep: Yup.string().required("Fill in this field!"),
            usa_street: Yup.string().required("Fill in this field!"),
            usa_number: Yup.string().required("Fill in this field!"),
            usa_neighborhood: Yup.string().required("Fill in this field!"),
            usa_complement: Yup.string(),
            usa_city: Yup.string().required("Fill in this field!"),
            usa_state: Yup.string().required("Fill in this field!")
        });
    } else {
        return Yup.object().shape({});
    }
};
