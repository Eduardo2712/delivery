import { validateCPF } from "@/utils/other";
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
    let schema = Yup.object();

    if (step === 0) {
        schema = Yup.object().shape({
            email: Yup.string().email("Fill in with a valid e-mail!").required("Fill in this field!"),
            password: Yup.string().min(8, "Password must be at least 8 characters long!").required("Fill in this field!"),
            password_confirmation: Yup.string()
                .min(8, "Password must be at least 8 characters long!")
                .oneOf([Yup.ref("password"), undefined], "Passwords must be the same!")
                .required("Fill in this field!"),
            use_name: Yup.string().required("Fill in this field!"),
            use_cpf: Yup.string()
                .length(14, "CPF must be at least 14 characters long!")
                .test("is-cpf-valid", "Invalid CPF!", (value) => validateCPF(value as string))
                .required("Fill in this field!"),
            use_phone: Yup.string()
                .matches(/(\(?\d{2}\)?\s?\d{4,5}\-\d{4})/, "Invalid phone number!")
                .required("Fill in this field!"),
            use_date_birth: Yup.date().required("Fill in this field!")
        });
    } else if (step === 1) {
        schema = Yup.object().shape({
            usa_cep: Yup.string()
                .matches(/(\d{5}-?\d{3})/, "Invalid CEP!")
                .length(9, "CEP must be at least 9 characters long!")
                .required("Fill in this field!"),
            usa_street: Yup.string().required("Fill in this field!"),
            usa_number: Yup.string().required("Fill in this field!"),
            usa_neighborhood: Yup.string().required("Fill in this field!"),
            usa_complement: Yup.string().optional(),
            usa_city: Yup.string().required("Fill in this field!"),
            usa_state: Yup.string().required("Fill in this field!")
        });
    }

    return schema;
};
