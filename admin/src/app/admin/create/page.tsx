"use client";

import StyleInput from "@/components/style-input";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { FaSpinner } from "react-icons/fa6";
import { router_base, schema } from "./utils";
import { useState } from "react";
import { AdminCreateRequestType } from "@/types/request/admin.type";
import { maskPhone } from "@/utils/mask";
import Link from "next/link";
import { create } from "@/requests/admin.request";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page: NextPage = () => {
    const [submitting, setSubmitting] = useState<boolean>(false);

    const router = useRouter();

    const onSubmit = async (values: AdminCreateRequestType) => {
        setSubmitting(true);

        try {
            const response = await create(values);

            if (response.status !== 201) {
                return toast.error(response.data.message);
            }

            toast.success("User created successfully");

            router.push(router_base);
        } catch (error: any) {
            console.log(error);
            return toast.error(error?.message ?? "An error has occurred");
        } finally {
            setSubmitting(false);
        }
    };

    const initialValues: AdminCreateRequestType = {
        email: "",
        password: "",
        adm_name: "",
        adm_phone: "",
        confirm_password: ""
    };

    return (
        <div className={`flex min-h-full flex-col justify-center mx-auto gap-5 rounded px-8 py-4 bg-slate-800`}>
            <p className="text-2xl font-bold">Admin - Create</p>

            <Formik onSubmit={onSubmit} validateOnMount validationSchema={schema} initialValues={initialValues}>
                {({ handleChange, handleBlur, values, errors, touched }) => (
                    <Form method="post" noValidate>
                        <div className="flex gap-4 flex-col">
                            <div className="flex min-h-full flex-col justify-between gap-4 container mx-auto px-4 lg:flex-row">
                                <div className="max-w-2xl flex-1">
                                    <StyleInput
                                        errors={errors.adm_name}
                                        touched={touched.adm_name}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        name={"adm_name"}
                                        title={"Name"}
                                        type={"text"}
                                        value={values.adm_name}
                                        is_required={true}
                                    />
                                </div>

                                <div className="max-w-2xl flex-1">
                                    <StyleInput
                                        errors={errors.adm_phone}
                                        touched={touched.adm_phone}
                                        handleBlur={handleBlur}
                                        handleChange={(e) => handleChange(maskPhone(e))}
                                        name={"adm_phone"}
                                        title={"Phone"}
                                        type={"text"}
                                        value={values.adm_phone}
                                        is_required={true}
                                    />
                                </div>
                            </div>

                            <div className="flex min-h-full flex-col justify-between gap-4 container mx-auto px-4 lg:flex-row">
                                <div className="max-w-2xl flex-1">
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

                                <div className="max-w-2xl flex-1">
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

                            <div className="flex min-h-full flex-col gap-4 container mx-auto px-4 lg:flex-row">
                                <div className="max-w-2xl flex-1">
                                    <StyleInput
                                        errors={errors.confirm_password}
                                        touched={touched.confirm_password}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        name={"confirm_password"}
                                        title={"Confirm password"}
                                        type={"password"}
                                        value={values.confirm_password}
                                        is_required={true}
                                    />
                                </div>

                                <div className="max-w-2xl flex-1"></div>
                            </div>
                        </div>

                        <div className="mt-3 flex flex-col justify-between container mx-auto px-4 md:flex-row">
                            <Link
                                href={router_base}
                                className="flex h-10 items-center justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mt-4 md:w-36"
                            >
                                {!submitting ? "Return" : <FaSpinner className="animate-spin" size={20} />}
                            </Link>

                            <button
                                type="submit"
                                className="flex h-10 items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mt-4 md:w-36"
                            >
                                {!submitting ? "Create" : <FaSpinner className="animate-spin" size={20} />}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Page;
