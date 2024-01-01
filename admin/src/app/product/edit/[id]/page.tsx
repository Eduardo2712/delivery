"use client";

import StyleInput from "@/components/style-input";
import { Form, Formik } from "formik";
import { FaSpinner, FaTrash } from "react-icons/fa6";
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
import { formatBRL, formatDecimal, listEnableDisable } from "@/utils/other";
import StyleSelect from "@/components/style-select";
import { CategoryType, ProductType } from "@/types/entity/entity.type";
import LoadingSpinner from "@/components/loading-spinner";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { format } from "date-fns";
import TextEmpty from "@/components/text-empty";
import { list } from "@/requests/category.request";

type Params = {
    params: { id: number };
};

const Page: NextPage<Params> = ({ params: { id } }) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ProductType | null>(null);
    const [page, setPage] = useState<number>(1);
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const [response1, response2] = await Promise.all([get(id), list()]);

                if (response1.status !== HttpStatusCode.Ok) {
                    return toast.error(response1.data.message);
                }

                if (response2.status !== HttpStatusCode.Ok) {
                    return toast.error(response2.data.message);
                }

                setData(response1.data);
                setCategories(response2.data);
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
            const response = await edit(id, createFormData(values));

            if (response.status !== HttpStatusCode.Ok) {
                return toast.error(response.data.message);
            }

            toast.success("Product updated successfully");

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
        pro_id_category: data?.pro_id_category ?? null,
        pro_ingredients: data?.pro_ingredients ?? "",
        pro_number_people: data?.pro_number_people ?? 1,
        pro_name: data?.pro_name ?? "",
        pro_price: data?.pro_price ? formatDecimal(data.pro_price) : "",
        pro_status: data?.pro_status ? "1" : "0",
        picture: undefined,
        new_picture: false
    };

    return (
        <>
            <p className="text-2xl font-bold">Product - Update</p>

            <LoadingSpinner loading={loading}>
                <Formik onSubmit={onSubmit} validateOnMount validationSchema={schemaUpdate} initialValues={initialValues}>
                    {({ handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                        <Form method="post" noValidate>
                            {!values.new_picture && data?.image && (
                                <CustomBox>
                                    <div className="flex items-center justify-center flex-col">
                                        <a className="flex justify-center" href={data.image.url} target="_blank">
                                            <img src={data.image.url} alt={"Picture admin"} className="max-w-md h-full object-cover w-full" />
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

                            <CustomBox text="Histories">
                                {data?.histories && data.histories.length > 0 ? (
                                    <div className="w-full">
                                        <DataTable
                                            value={data?.histories ?? []}
                                            className="table-auto w-full"
                                            showGridlines
                                            stripedRows
                                            scrollable={true}
                                            emptyMessage={"No data"}
                                            paginator
                                            loading={loading}
                                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                            rows={page * 10}
                                            onPage={(e) => setPage((e.page ?? 1) + 1)}
                                        >
                                            <Column field="prh_price" header="Price" body={(e) => formatBRL(e.prh_price ?? 0)} />
                                            <Column field="admin.adm_name" header="Admin" />
                                            <Column
                                                field="prh_date"
                                                header="Date"
                                                body={(e) => (e.prh_date ? format(new Date(e.prh_date), "dd/MM/yyyy HH:mm") : "")}
                                            />
                                        </DataTable>
                                    </div>
                                ) : (
                                    <TextEmpty text="No histories" />
                                )}
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
