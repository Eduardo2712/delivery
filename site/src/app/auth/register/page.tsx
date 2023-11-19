"use client";

import { Form, Formik } from "formik";
import { useState } from "react";
import { TypeFormRegister, schema } from "./utils";
import { useRouter } from "next/navigation";
import { createUser } from "@/requests/user.request";
import { toast } from "react-hot-toast";
import StyleInput from "@/components/style-input";
import { maskCPF, maskPhone } from "@/utils/mask";
import axios, { HttpStatusCode } from "axios";

const Page = () => {
    const [step, setStep] = useState<number>(1);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const router = useRouter();

    const initialValues: TypeFormRegister = {
        email: "",
        password: "",
        password_confirmation: "",
        use_name: "",
        use_cpf: "",
        use_phone: "",
        use_date_birth: "",
        usa_cep: "",
        usa_street: "",
        usa_number: "",
        usa_neighborhood: "",
        usa_complement: "",
        usa_city: "",
        usa_state: ""
    };

    const onSubmit = async (values: TypeFormRegister) => {
        if (step !== 1) {
            return setStep((bef) => bef + 1);
        }

        setSubmitting(true);

        try {
            const response = await createUser(values);

            if (response.status !== HttpStatusCode.Ok) {
                return toast.error(response.data.message);
            }

            toast.success("Successfully registered user");

            router.push("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data?.message ?? "An error has occurred");
            } else {
                return toast.error("An error has occurred");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto h-screen max-w-5xl">
            <div className="flex justify-between items-center px-3 py-4">
                <div className={`flex justify-center items-center rounded-full ${step === 1 ? "bg-blue-600" : "bg-gray-400"} w-12 h-12`}>
                    <p className="text-gray-50 font-bold text-xl">1</p>
                </div>

                <div className="border-b-2 border-gray-400 flex-1 m-3"></div>

                <div className={`flex justify-center items-center rounded-full ${step === 2 ? "bg-blue-600" : "bg-gray-400"} w-12 h-12`}>
                    <p className="text-gray-50 font-bold text-xl">2</p>
                </div>

                <div className="border-b-2 border-gray-400 flex-1 m-3"></div>

                <div className={`flex justify-center items-center rounded-full ${step === 3 ? "bg-blue-600" : "bg-gray-400"} w-12 h-12`}>
                    <p className="text-gray-50 font-bold text-xl">3</p>
                </div>
            </div>

            <p className="text-center text-2xl font-bold mt-8 text-gray-50">Personal information</p>

            <Formik initialValues={initialValues} validationSchema={schema(step)} validateOnMount onSubmit={onSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <Form method="post" onSubmit={handleSubmit} noValidate>
                        <div className="sm:columns-2 px-3">
                            <StyleInput
                                errors={errors.use_name}
                                touched={touched.use_name}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                name={"use_name"}
                                title={"Name"}
                                type={"text"}
                                value={values.use_name}
                                is_required={true}
                            />

                            <StyleInput
                                errors={errors.use_cpf}
                                touched={touched.use_cpf}
                                handleBlur={handleBlur}
                                handleChange={(e) => handleChange(maskCPF(e))}
                                name={"use_cpf"}
                                title={"CPF"}
                                type={"text"}
                                value={values.use_cpf}
                                is_required={true}
                                max_length={14}
                            />
                        </div>

                        <div className="sm:columns-2 px-3">
                            <StyleInput
                                errors={errors.use_phone}
                                touched={touched.use_phone}
                                handleBlur={handleBlur}
                                handleChange={(e) => handleChange(maskPhone(e))}
                                name={"use_phone"}
                                title={"Phone number"}
                                type={"text"}
                                value={values.use_phone}
                                is_required={true}
                            />

                            <StyleInput
                                errors={errors.email}
                                touched={touched.email}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                name={"email"}
                                title={"Email"}
                                type={"email"}
                                value={values.email}
                                is_required={true}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Page;
