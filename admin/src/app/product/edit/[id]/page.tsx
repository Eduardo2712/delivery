"use client";

import StyleInput from "@/components/style-input";
import { Form, Formik } from "formik";
import { FaSpinner } from "react-icons/fa6";
import { createFormData, router_base, schemaUpdate } from "../../utils";
import { useEffect, useState } from "react";
import { ProductUpdateType } from "@/types/request/product.type";
import Link from "next/link";
import { edit, get } from "@/requests/product.request";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios, { HttpStatusCode } from "axios";
import CustomBox from "@/components/custom-box";
import { NextPage } from "next";
import { maskMoney } from "@/utils/mask";
import FileUpload from "@/components/file-upload";
import { formatDecimal, listEnableDisable } from "@/utils/other";
import StyleSelect from "@/components/style-select";
import { ProductType } from "@/types/entity/entity.type";
import LoadingSpinner from "@/components/loading-spinner";

type Params = {
    params: { id: number };
};

const Page: NextPage<Params> = ({ params: { id } }) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ProductType | null>(null);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const response = await get(id);

                if (response.status !== HttpStatusCode.Ok) {
                    return toast.error(response.data.message);
                }

                setData(response.data);
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    return toast.error(error.response?.data?.message ?? "An error has occurred");
                } else {
                    return toast.error("An error has occurred");
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const onSubmit = async (values: ProductUpdateType) => {
        setSubmitting(true);

        try {
            delete values.pictures_old;

            const response = await edit(id, createFormData(values));

            if (response.status !== HttpStatusCode.Ok) {
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

    const initialValues: ProductUpdateType = {
        pro_description: data?.pro_description ?? "",
        pro_name: data?.pro_name ?? "",
        pro_price: data?.pro_price ? formatDecimal(data.pro_price) : "",
        pro_status: data?.pro_status ? "1" : "0",
        pictures: [],
        pictures_delete: [],
        pictures_old: data?.files ?? []
    };

    return (
        <>
            <p className="text-2xl font-bold">Product - Update</p>

            <LoadingSpinner loading={loading}>
                <Formik onSubmit={onSubmit} validateOnMount validationSchema={schemaUpdate} initialValues={initialValues}>
                    {({ handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                        <Form method="post" noValidate>
                            <FileUpload
                                multiple
                                pictures={values.pictures}
                                setFieldValue={setFieldValue}
                                errors={errors.pictures ?? ""}
                                touched={touched.pictures ?? false}
                                pictures_old={values.pictures_old ?? []}
                            />

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
                                            handleChange={(e) => handleChange(maskMoney(e))}
                                            name={"pro_price"}
                                            title={"Price (R$)"}
                                            type={"text"}
                                            value={values.pro_price}
                                            is_required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <div>
                                        <StyleSelect
                                            errors={errors.pro_status}
                                            touched={touched.pro_status}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"pro_status"}
                                            title={"Status"}
                                            value={values.pro_status}
                                            is_required
                                            emptyOption
                                        >
                                            {listEnableDisable.map((item) => {
                                                return (
                                                    <option key={item.value} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                );
                                            })}
                                        </StyleSelect>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
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
            </LoadingSpinner>
        </>
    );
};

export default Page;
