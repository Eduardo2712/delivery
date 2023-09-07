"use client";

import { Formik, Form } from "formik";
import { schema } from "./utils";
import { login } from "@/store/auth/auth.slice";
import { useDispatch } from "react-redux";
import { auth } from "@/requests/auth.request";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StyleInput from "@/components/style-input";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { AuthRequestType } from "@/types/request/auth.type";
import axios, { HttpStatusCode } from "axios";
import { NextPage } from "next";

const Page: NextPage = () => {
    const [submitting, setSubmitting] = useState<boolean>(false);

    const dispatch = useDispatch();

    const router = useRouter();

    const onSubmit = async (values: AuthRequestType) => {
        setSubmitting(true);

        try {
            const response = await auth({
                email: values.email,
                password: values.password
            });

            if (response.status !== HttpStatusCode.Created) {
                return toast.error(response.data.message);
            }

            if (response.data.admin && response.data.token) {
                dispatch(login({ user: response.data.admin, token: response.data.token }));

                toast.success("Successfully login");

                router.push("/");
            }
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

    const initialValues: AuthRequestType = {
        email: "",
        password: ""
    };

    return (
        <Formik onSubmit={onSubmit} validateOnMount validationSchema={schema} initialValues={initialValues}>
            {({ handleChange, handleBlur, values, errors, touched }) => (
                <Form method="post" noValidate>
                    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <p className="mt-10 text-center text-5xl font-extrabold italic leading-9 tracking-tight text-blue-500">Delivery</p>
                        </div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">Sign in</p>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className="space-y-3">
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

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full h-10 items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mt-4"
                                    >
                                        {!submitting ? "Sign in" : <FaSpinner className="animate-spin" size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="text-center mt-3">
                                <Link href="/auth/register">
                                    <span className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500">
                                        {"I forgot the password"}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Page;
