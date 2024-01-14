"use client";

import StyleInput from "@/components/style-input";
import { Form, Formik } from "formik";
import { FaSpinner } from "react-icons/fa6";
import { createFormData, router_base, schemaCreate } from "../utils";
import { useEffect, useState } from "react";
import { ProductCreateType } from "@/types/request/product.type";
import Link from "next/link";
import { create } from "@/requests/product.request";
import { list } from "@/requests/category.request";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios, { HttpStatusCode } from "axios";
import CustomBox from "@/components/custom-box";
import { NextPage } from "next";
import { maskMoney } from "@/utils/mask";
import FileUpload from "@/components/file-upload";
import StyleSelect from "@/components/style-select";
import { listEnableDisable } from "@/utils/other";
import { CategoryType } from "@/types/entity/entity.type";
import LoadingSpinner from "@/components/loading-spinner";
import BoxExtra from "@/components/box-extra";

const Page: NextPage = () => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const response = await list();

                if (response.status !== HttpStatusCode.Ok) {
                    return toast.error(response.data.message);
                }

                setCategories(response.data);
            } catch (error) {
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
        pro_id_category: null,
        pro_ingredients: "",
        pro_number_people: 1,
        pro_name: "",
        pro_price: "",
        pro_status: "",
        picture: undefined,
        extras: []
    };

    return (
        <>
            <p className="text-2xl font-bold">Product - Create</p>

            <LoadingSpinner loading={loading}>
                <Formik onSubmit={onSubmit} validateOnMount validationSchema={schemaCreate} initialValues={initialValues}>
                    {({ handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                        <Form method="post" noValidate>
                            <FileUpload
                                picture={values.picture}
                                setFieldValue={setFieldValue}
                                errors={errors.picture ?? ""}
                                touched={touched.picture ?? false}
                            />

                            <CustomBox text="Basic information">
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
                                            title={"Current price (R$)"}
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

                                    <div>
                                        <StyleInput
                                            errors={errors.pro_number_people}
                                            touched={touched.pro_number_people}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"pro_number_people"}
                                            title={"Number of people"}
                                            type={"number"}
                                            value={values.pro_number_people}
                                            is_required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <div>
                                        <StyleSelect
                                            errors={errors.pro_id_category}
                                            touched={touched.pro_id_category}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"pro_id_category"}
                                            title={"Category"}
                                            value={values.pro_id_category}
                                            is_required
                                            emptyOption
                                        >
                                            {categories.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.id}>
                                                        {item.cat_name}
                                                    </option>
                                                );
                                            })}
                                        </StyleSelect>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
                                    <div>
                                        <StyleInput
                                            errors={errors.pro_ingredients}
                                            touched={touched.pro_ingredients}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            name={"pro_ingredients"}
                                            title={"Ingredients"}
                                            type={"text"}
                                            value={values.pro_ingredients}
                                            is_required
                                            multiple
                                        />
                                    </div>
                                </div>
                            </CustomBox>

                            <BoxExtra extras={values.extras} setFieldValue={setFieldValue} loading={loading} />

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
