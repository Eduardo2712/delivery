"use client";

import StyleInput from "@/components/style-input";
import { Form, Formik } from "formik";
import { FaSpinner, FaTrash } from "react-icons/fa6";
import { createFormData, router_base, schemaCreate, schemaUpdate } from "../../utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { edit, get } from "@/requests/extra.request";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios, { HttpStatusCode } from "axios";
import CustomBox from "@/components/custom-box";
import { NextPage } from "next";
import { maskMoney } from "@/utils/mask";
import FileUpload from "@/components/file-upload";
import StyleSelect from "@/components/style-select";
import { formatDecimal, listEnableDisable } from "@/utils/other";
import { ExtraUpdateType } from "@/types/request/extra.type";
import { ExtraType } from "@/types/entity/entity.type";
import LoadingSpinner from "@/components/loading-spinner";

type Params = {
    params: { id: number };
};

const Page: NextPage<Params> = ({ params: { id } }) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ExtraType | null>(null);

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

    const onSubmit = async (values: ExtraUpdateType) => {
        setSubmitting(true);

        try {
            const response = await edit(id, createFormData(values));

            if (response.status !== HttpStatusCode.Ok) {
                return toast.error(response.data.message);
            }

            toast.success("Extra edited successfully");

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

    const initialValues: ExtraUpdateType = {
        ext_name: data?.ext_name ?? "",
        ext_price: data?.ext_price ? formatDecimal(data.ext_price) : "",
        ext_status: data?.ext_status ? "1" : "0",
        picture: undefined,
        new_picture: false
    };

    return (
        <>
            <p className="text-2xl font-bold">Extra - Edit</p>

            <LoadingSpinner loading={loading}>
                <Formik onSubmit={onSubmit} validateOnMount validationSchema={schemaUpdate} initialValues={initialValues}>
                    {({ handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                        <Form method="post" noValidate>
                            {!values.new_picture && data?.image && (
                                <CustomBox>
                                    <div className="flex items-center justify-center flex-col">
                                        <a className="flex justify-center" href={data.image.url} target="_blank">
                                            <img src={data.image.url} alt={"Picture extra"} className="max-w-md h-full object-cover w-full" />
                                        </a>

                                        <button
                                            className="bg-red-600 text-white rounded px-3 py-2 w-full max-w-md flex justify-center items-center gap-3"
                                            type="button"
                                            onClick={() => {
                                                setFieldValue("picture", undefined);
                                                setFieldValue("new_picture", true);
                                            }}
                                        >
                                            <FaTrash /> Remove
                                        </button>
                                    </div>
                                </CustomBox>
                            )}

                            {values.new_picture && (
                                <FileUpload
                                    picture={values.picture}
                                    setFieldValue={setFieldValue}
                                    errors={errors.picture ?? ""}
                                    touched={touched.picture ?? false}
                                />
                            )}

                            <CustomBox text="Basic information">
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <div>
                                        <StyleInput
                                            errors={errors.ext_name}
                                            touched={touched.ext_name}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"ext_name"}
                                            title={"Name"}
                                            type={"text"}
                                            value={values.ext_name}
                                            is_required
                                        />
                                    </div>

                                    <div>
                                        <StyleInput
                                            errors={errors.ext_price}
                                            touched={touched.ext_price}
                                            handleBlur={handleBlur}
                                            handleChange={(e) => handleChange(maskMoney(e))}
                                            name={"ext_price"}
                                            title={"Price (R$)"}
                                            type={"text"}
                                            value={values.ext_price}
                                            is_required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <div>
                                        <StyleSelect
                                            errors={errors.ext_status}
                                            touched={touched.ext_status}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"ext_status"}
                                            title={"Status"}
                                            value={values.ext_status}
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
                                        {!submitting ? "Update" : <FaSpinner className="animate-spin" size={20} />}
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
