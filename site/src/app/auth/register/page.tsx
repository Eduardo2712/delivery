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
import { FaSpinner } from "react-icons/fa6";
import { NextPage } from "next";

const Page: NextPage = () => {
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
        use_birth_date: "",
        usa_cep: "",
        usa_street: "",
        usa_number: "",
        usa_neighborhood: "",
        usa_complement: "",
        usa_city: "",
        usa_state: ""
    };

    const onSubmit = async (values: TypeFormRegister) => {
        if (step < 2) {
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
                <div className={`flex justify-center items-center rounded-full ${step >= 1 ? "bg-blue-600" : "bg-gray-400"} w-12 h-12`}>
                    <p className="text-gray-50 font-bold text-xl">1</p>
                </div>

                <div className="border-b-2 border-gray-400 flex-1 m-3"></div>

                <div className={`flex justify-center items-center rounded-full ${step === 2 ? "bg-blue-600" : "bg-gray-400"} w-12 h-12`}>
                    <p className="text-gray-50 font-bold text-xl">2</p>
                </div>
            </div>

            <p className="text-center text-2xl font-bold mt-8 text-gray-50">{step === 1 ? "Personal information" : "Address information"}</p>

            <Formik initialValues={initialValues} validationSchema={schema(step)} onSubmit={onSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <Form method="post" onSubmit={handleSubmit} noValidate className="flex-1 flex-col">
                        <div>
                            {step === 1 && (
                                <>
                                    <div className="sm:columns-2 px-3 gap-6">
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

                                    <div className="sm:columns-2 px-3 gap-6">
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

                                    <div className="sm:columns-2 px-3 gap-6">
                                        <StyleInput
                                            errors={errors.use_birth_date}
                                            touched={touched.use_birth_date}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"use_birth_date"}
                                            title={"Date of birth"}
                                            type={"date"}
                                            value={values.use_birth_date}
                                            is_required={true}
                                        />

                                        <StyleInput
                                            errors={errors.password}
                                            touched={touched.password}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"password"}
                                            title={"Password"}
                                            type={"password"}
                                            value={values.password}
                                            is_required={true}
                                        />
                                    </div>

                                    <div className="sm:columns-2 px-3 gap-6">
                                        <StyleInput
                                            errors={errors.password_confirmation}
                                            touched={touched.password_confirmation}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"password_confirmation"}
                                            title={"Password confirmation"}
                                            type={"password"}
                                            value={values.password_confirmation}
                                            is_required={true}
                                        />
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div className="sm:columns-2 px-3 gap-6">
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
                                </>
                            )}
                        </div>

                        <div className="sm:columns-2 px-3 mt-6 justify-between flex flex-1">
                            <button type="button" onClick={() => setStep((bef) => bef - 1)} className="px-4 py-2 bg-orange-500 text-white rounded-md">
                                {!submitting ? `Back` : <FaSpinner className="animate-spin" size={20} />}
                            </button>

                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                                {!submitting ? `Next` : <FaSpinner className="animate-spin" size={20} />}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Page;
