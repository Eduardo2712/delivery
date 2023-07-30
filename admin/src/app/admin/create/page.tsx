"use client";

import StyleInput from "@/components/style-input";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { FaSpinner } from "react-icons/fa6";
import { schema } from "./utils";
import { useState } from "react";

const Page: NextPage = () => {
    const [submitting, setSubmitting] = useState<boolean>(false);

    const onSubmit = () => {};

    const initialValues = {
        email: "",
        password: ""
    };

    return (
        <div className={`flex min-h-full flex-col justify-center mx-auto gap-5 rounded px-3 py-4 bg-slate-800`}>
            <p className="text-2xl font-bold">Admin - Create</p>

            <Formik onSubmit={onSubmit} validateOnMount validationSchema={schema} initialValues={initialValues}>
                {({ handleChange, handleBlur, values, errors, touched }) => (
                    <Form method="post" noValidate>
                        <div className="flex gap-3 flex-col">
                            <div className="flex min-h-full flex-col gap-3 container mx-auto px-4 lg:flex-row">
                                <div className="flex-1">
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

                                <div className="flex-1">
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
                            </div>

                            <div className="flex min-h-full flex-col gap-3 container mx-auto px-4 lg:flex-row">
                                <div className="flex-1">
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

                                <div className="flex-1">
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
                            </div>
                        </div>

                        {/* <button
                                type="submit"
                                className="flex w-full h-10 items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mt-4"
                            >
                                {!submitting ? "Create" : <FaSpinner className="animate-spin" size={20} />}
                            </button> */}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Page;
