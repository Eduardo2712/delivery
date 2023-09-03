"use client";

import StyleInput from "@/components/style-input";
import { Form, Formik } from "formik";
import { FaSpinner, FaTrash } from "react-icons/fa6";
import { createFormData, router_base, schemaUpdate } from "../../utils";
import { useEffect, useState } from "react";
import { AdminUpdateType } from "@/types/request/admin.type";
import { maskPhone } from "@/utils/mask";
import Link from "next/link";
import { edit, get } from "@/requests/admin.request";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios, { HttpStatusCode } from "axios";
import CustomBox from "@/components/custom-box";
import StyleSelect from "@/components/style-select";
import { listEnableDisable } from "@/utils/other";
import { NextPage } from "next";
import LoadingSpinner from "@/components/loading-spinner";
import { AdminType } from "@/types/entity/entity.type";
import FileUpload from "@/components/file-upload";

type Params = {
    params: { id: number };
};

const Page: NextPage<Params> = ({ params }) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<AdminType | null>(null);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const response = await get(params.id);

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

    const onSubmit = async (values: AdminUpdateType) => {
        setSubmitting(true);

        try {
            const response = await edit(params.id, createFormData(values));

            if (response.status !== HttpStatusCode.Ok) {
                return toast.error(response.data.message);
            }

            toast.success("User updated successfully");

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

    const initialValues: AdminUpdateType = {
        email: data?.email ?? "",
        adm_name: data?.adm_name ?? "",
        adm_phone: data?.adm_phone ?? "",
        adm_status: data?.adm_status ? "1" : "0",
        confirm_password: "",
        password: "",
        picture: undefined,
        new_picture: false
    };

    return (
        <>
            <p className="text-2xl font-bold">Admin - Edit</p>

            <LoadingSpinner loading={loading}>
                <Formik onSubmit={onSubmit} validateOnMount validationSchema={schemaUpdate} initialValues={initialValues}>
                    {({ handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                        <Form method="post" noValidate>
                            {!values.new_picture && data?.picture && (
                                <CustomBox>
                                    <div className="flex items-center justify-center flex-col">
                                        <a className="flex justify-center" href={data.picture.fil_url} target="_blank">
                                            <img src={data.picture.fil_url} alt={"Picture admin"} className="max-w-md h-full object-cover w-full" />
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
                                    errors={errors.picture}
                                    touched={touched.picture}
                                />
                            )}

                            <CustomBox>
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <div>
                                        <StyleInput
                                            errors={errors.adm_name}
                                            touched={touched.adm_name}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"adm_name"}
                                            title={"Name"}
                                            type={"text"}
                                            value={values.adm_name}
                                            is_required
                                        />
                                    </div>

                                    <div>
                                        <StyleInput
                                            errors={errors.adm_phone}
                                            touched={touched.adm_phone}
                                            handleBlur={handleBlur}
                                            handleChange={(e) => handleChange(maskPhone(e))}
                                            name={"adm_phone"}
                                            title={"Phone"}
                                            type={"text"}
                                            value={values.adm_phone}
                                            is_required
                                        />
                                    </div>

                                    <div>
                                        <StyleInput
                                            errors={errors.email}
                                            touched={touched.email}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"email"}
                                            title={"Email"}
                                            type={"email"}
                                            value={values.email}
                                            is_required
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <StyleSelect
                                            errors={errors.adm_status}
                                            touched={touched.adm_status}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"adm_status"}
                                            title={"Status"}
                                            value={values.adm_status}
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

                                    <div>
                                        <StyleInput
                                            errors={errors.password}
                                            touched={touched.password}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"password"}
                                            title={"Password (fill only if changing)"}
                                            type={"password"}
                                            value={values.password}
                                        />
                                    </div>

                                    <div>
                                        <StyleInput
                                            errors={errors.confirm_password}
                                            touched={touched.confirm_password}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"confirm_password"}
                                            title={"Confirm password (fill only if changing)"}
                                            type={"password"}
                                            value={values.confirm_password}
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
                                        {!submitting ? "Save" : <FaSpinner className="animate-spin" size={20} />}
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
