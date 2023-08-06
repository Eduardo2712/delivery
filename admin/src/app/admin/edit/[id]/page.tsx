"use client";

import StyleInput from "@/components/style-input";
import { Form, Formik } from "formik";
import { FaSpinner } from "react-icons/fa6";
import { router_base, schemaUpdate } from "../../utils";
import { useEffect, useState } from "react";
import { AdminUpdateRequestType } from "@/types/request/admin.type";
import { maskPhone } from "@/utils/mask";
import Link from "next/link";
import { edit, get } from "@/requests/admin.request";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import CustomBox from "@/components/custom-box";
import StyleSelect from "@/components/style-select";
import { listEnableDisable } from "@/utils/other";
import { NextPage } from "next";
import LoadingSpinner from "@/components/loading-spinner";

type Params = {
    params: { id: number };
};

const Page: NextPage<Params> = ({ params }) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState(null as any);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const response = await get(params.id);

                if (response.status !== 200) {
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

    const onSubmit = async (values: AdminUpdateRequestType) => {
        setSubmitting(true);

        try {
            const response = await edit(params.id, values);

            if (response.status !== 201) {
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

    const initialValues: AdminUpdateRequestType = {
        email: data?.email ?? "",
        adm_name: data?.adm_name ?? "",
        adm_phone: data?.adm_phone ?? "",
        adm_status: data?.adm_status ? 1 : 0,
        current_password: "",
        new_password: ""
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <p className="text-2xl font-bold">Admin - Edit</p>

            <Formik onSubmit={onSubmit} validateOnMount validationSchema={schemaUpdate} initialValues={initialValues}>
                {({ handleChange, handleBlur, values, errors, touched }) => (
                    <Form method="post" noValidate>
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
                                        errors={errors.current_password}
                                        touched={touched.current_password}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        name={"current_password"}
                                        title={"Current password (Fill only if changing)"}
                                        type={"password"}
                                        value={values.current_password}
                                    />
                                </div>

                                <div>
                                    <StyleInput
                                        errors={errors.new_password}
                                        touched={touched.new_password}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        name={"new_password"}
                                        title={"New password (Fill only if changing)"}
                                        type={"password"}
                                        value={values.new_password}
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
        </>
    );
};

export default Page;
