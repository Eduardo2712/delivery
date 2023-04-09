import * as Yup from "yup";

export type TypeFormRegister = {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
    cpf_cnpj: string;
    phone: string;
    date_birth: string;
    cep: string;
    street: string;
    number: string;
    district: string;
    complement: string;
    city: string;
    state: string;
};

export const schema = (step: number, type: number | null) => {
    if (step === 1) {
        return type === 2
            ? Yup.object().shape({
                  email: Yup.string().email("Fill in with a valid e-mail!").required("Fill in this field!"),
                  password: Yup.string().min(8, "Password must be at least 8 characters long!").required("Fill in this field!"),
                  password_confirmation: Yup.string()
                      .min(8, "Password must be at least 8 characters long!")
                      .oneOf([Yup.ref("password"), undefined], "Passwords must be the same!")
                      .required("Fill in this field!"),
                  name: Yup.string().required("Fill in this field!"),
                  cpf_cnpj: Yup.string().length(14).required("Fill in this field!"),
                  phone: Yup.string().required("Fill in this field!"),
                  date_birth: Yup.date().required("Fill in this field!")
              })
            : Yup.object().shape({
                  email: Yup.string().email("Fill in with a valid e-mail!").required("Fill in this field!"),
                  password: Yup.string().min(8, "Password must be at least 8 characters long!").required("Fill in this field!"),
                  password_confirmation: Yup.string()
                      .min(8, "Password must be at least 8 characters long!")
                      .oneOf([Yup.ref("password"), undefined], "Passwords must be the same!")
                      .required("Fill in this field!"),
                  name: Yup.string().required("Fill in this field!"),
                  cpf_cnpj: Yup.string().length(18).required("Fill in this field!"),
                  phone: Yup.string().required("Fill in this field!")
              });
    } else if (step === 2) {
        return Yup.object().shape({
            cep: Yup.string().required("Fill in this field!"),
            street: Yup.string().required("Fill in this field!"),
            number: Yup.string().required("Fill in this field!"),
            district: Yup.string().required("Fill in this field!"),
            complement: Yup.string(),
            city: Yup.string().required("Fill in this field!"),
            state: Yup.string().required("Fill in this field!")
        });
    } else {
        return Yup.object().shape({});
    }
};
