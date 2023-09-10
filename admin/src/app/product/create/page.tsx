"use client";

import StyleInput from "@/components/style-input";
import { Form, Formik } from "formik";
import { FaSpinner } from "react-icons/fa6";
import { createFormData, router_base, schemaCreate } from "../utils";
import { useState } from "react";
import { ProductCreateType } from "@/types/request/product.type";
import Link from "next/link";
import { create } from "@/requests/product.request";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios, { HttpStatusCode } from "axios";
import CustomBox from "@/components/custom-box";
import { NextPage } from "next";
import { maskMoney } from "@/utils/mask";
import FileUpload from "@/components/file-upload";

const Page: NextPage = () => {
    const [submitting, setSubmitting] = useState<boolean>(false);

    const router = useRouter();

    const onSubmit = async (values: ProductCreateType) => {
        setSubmitting(true);

        try {
            const response = await create(createFormData(values));

            if (response.status !== HttpStatusCode.Created) {
                return toast.error(response.data.message);
            }

            toast.success("Product created successfully");

            router.push(router_base);
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

    const initialValues: ProductCreateType = {
        pro_description: "",
        pro_name: "",
        pro_price: "",
        pictures: []
    };

    return (
        <>
            <p className="text-2xl font-bold">Product - Create</p>

            <Formik onSubmit={onSubmit} validateOnMount validationSchema={schemaCreate} initialValues={initialValues}>
                {({ handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                    <Form method="post" noValidate>
                        <FileUpload pictures={values.pictures} setFieldValue={setFieldValue} errors={errors.pictures} touched={touched.pictures} />

                        <CustomBox>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <div>
                                    <StyleInput
                                        errors={errors.pro_name}
                                        touched={touched.pro_name}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        name={"pro_name"}
                                        title={"Name"}
                                        type={"text"}
                                        value={values.pro_name}
                                        is_required
                                    />
                                </div>

                                <div>
                                    <StyleInput
                                        errors={errors.pro_price}
                                        touched={touched.pro_price}
                                        handleBlur={handleBlur}
                                        handleChange={(e) => handleChange(maskMoney(e).target.value)}
                                        name={"pro_price"}
                                        title={"Price (R$)"}
                                        type={"text"}
                                        value={values.pro_price}
                                        is_required
                                    />
                                </div>

                                <div>
                                    <StyleInput
                                        errors={errors.pro_description}
                                        touched={touched.pro_description}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        name={"pro_description"}
                                        title={"Description"}
                                        type={"text"}
                                        value={values.pro_description}
                                        is_required
                                        multiple
                                    />
                                </div>
                            </div>
                        </CustomBox>

                        <CustomBox>
                            <div className="gap-2 flex flex-col justify-between md:flex-row">
                                <Link
                                    href={router_base}
                                    className="flex h-10 items-center justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:w-36"
                                >
                                    {!submitting ? "Return" : <FaSpinner className="animate-spin" size={20} />}
                                </Link>

                                <button
                                    type="submit"
                                    className="flex h-10 items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:w-36"
                                >
                                    {!submitting ? "Create" : <FaSpinner className="animate-spin" size={20} />}
                                </button>
                            </div>
                        </CustomBox>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Page;
