"use client";

import { NextPage } from "next";
import LoadingSpinner from "@/components/loading-spinner";
import { useState, useEffect } from "react";
import CustomBox from "@/components/custom-box";
import StyleInput from "@/components/style-input";
import axios, { HttpStatusCode } from "axios";
import toast from "react-hot-toast";
import { get } from "@/requests/order.request";
import { format } from "date-fns";
import { Column } from "primereact/column";
import { OrderGetType } from "@/types/request/order.type";
import Link from "next/link";
import { router_base } from "../../utils";
import { formatBRL } from "@/utils/other";
import { DataTable } from "primereact/datatable";
import { FaEye } from "react-icons/fa6";
import { ItemType } from "@/types/entity/entity.type";

type Params = {
    params: { id: number };
};

const Page: NextPage<Params> = ({ params: { id } }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<OrderGetType | null>(null);

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

    const orderValue = () => {
        return formatBRL(data?.items.reduce((total, item) => total + item.ite_price * item.ite_quantity, 0) ?? 0);
    };

    const buttons = (item: ItemType) => {
        return (
            <Link
                href={`/product/edit/${item?.product.id}`}
                className="bg-blue-600 hover:bg-blue-700 rounded px-2 py-2 text-gray-100 h-9 w-9 flex text-center items-center justify-center"
            >
                <FaEye />
            </Link>
        );
    };

    return (
        <>
            <p className="text-2xl font-bold">Order - View</p>

            <LoadingSpinner loading={loading}>
                <CustomBox text="Basic information">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div>
                            <StyleInput value={data?.id} disabled title={"Number order"} />
                        </div>

                        <div>
                            <StyleInput link={`/user/view/${data?.user.id}`} value={data?.user.use_name} readOnly title={"Client"} />
                        </div>

                        <div>
                            <StyleInput
                                style_input={{ color: data?.order_status[data.order_status.length - 1]?.status?.sta_color ?? "" }}
                                value={data?.order_status[data.order_status.length - 1]?.status?.sta_name ?? ""}
                                disabled
                                title={"Current status"}
                            />
                        </div>

                        <div>
                            <StyleInput value={orderValue()} disabled title={"Value order"} />
                        </div>

                        <div>
                            <StyleInput
                                value={data?.created_at ? format(new Date(data.created_at), "dd/MM/yyyy HH:mm:ss") : ""}
                                disabled
                                title={"Created at"}
                            />
                        </div>

                        <div>
                            <StyleInput
                                value={data?.updated_at ? format(new Date(data.updated_at), "dd/MM/yyyy HH:mm:ss") : ""}
                                disabled
                                title={"Updated at"}
                            />
                        </div>
                    </div>
                </CustomBox>

                <CustomBox text="Address order">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div>
                            <StyleInput value={data?.ord_cep} disabled title={"CEP"} />
                        </div>

                        <div>
                            <StyleInput value={data?.ord_street} disabled title={"Street"} />
                        </div>

                        <div>
                            <StyleInput value={data?.ord_number} disabled title={"Number"} />
                        </div>

                        <div>
                            <StyleInput value={data?.ord_complement} disabled title={"Complement"} />
                        </div>

                        <div>
                            <StyleInput value={data?.ord_neighborhood} disabled title={"Neighborhood"} />
                        </div>

                        <div>
                            <StyleInput value={data?.ord_city} disabled title={"City"} />
                        </div>

                        <div>
                            <StyleInput value={data?.ord_state} disabled title={"State"} />
                        </div>
                    </div>
                </CustomBox>

                <CustomBox text="Order details">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div>
                            <StyleInput value={data?.ord_confirmed_payment ? "Yes" : "No"} disabled title={"Confirmed payment"} />
                        </div>

                        <div>
                            <StyleInput value={data?.ord_is_delivery ? "Yes" : "No"} disabled title={"Delivery?"} />
                        </div>

                        {data?.ord_is_delivery && (
                            <div>
                                <StyleInput value={formatBRL(data?.ord_delivery_fee ?? 0)} disabled title={"Delivery?"} />
                            </div>
                        )}

                        <div>
                            <StyleInput value={data?.ord_delivered ? "Yes" : "No"} disabled title={"Delivered?"} />
                        </div>
                    </div>
                </CustomBox>

                <CustomBox text="Items">
                    <DataTable
                        value={data?.items ?? []}
                        className="table-auto w-full"
                        showGridlines
                        stripedRows
                        scrollable
                        emptyMessage={"No data"}
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    >
                        <Column field="product.id" header="ID" />
                        <Column field="product.pro_name" header="Name" />
                        <Column field="ite_price" header="Value" body={(e: ItemType) => formatBRL(e.ite_price)} />
                        <Column field="ite_quantity" header="Quantity" />
                        <Column className="w-12 min-w-12" field="options" header="Options" body={(e: ItemType) => buttons(e)} />
                    </DataTable>
                </CustomBox>

                <CustomBox>
                    <div className="gap-2 flex flex-col justify-between md:flex-row">
                        <Link
                            href={router_base}
                            className="flex h-10 items-center justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:w-36"
                        >
                            Return
                        </Link>
                    </div>
                </CustomBox>
            </LoadingSpinner>
        </>
    );
};

export default Page;
