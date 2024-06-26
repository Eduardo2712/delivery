"use client";

import { NextPage } from "next";
import LoadingSpinner from "@/components/loading-spinner";
import { useState, useEffect } from "react";
import CustomBox from "@/components/custom-box";
import StyleInput from "@/components/style-input";
import axios, { HttpStatusCode } from "axios";
import toast from "react-hot-toast";
import { get } from "@/requests/user.request";
import { format } from "date-fns";
import { UserGetType } from "@/types/request/user.type";
import CustomTable from "@/components/custom-table";
import { Column } from "primereact/column";
import { getDatatable } from "@/requests/order.request";
import { formatBRL } from "@/utils/other";
import Link from "next/link";
import { router_base } from "../../utils";
import { FaSpinner } from "react-icons/fa6";

type Params = {
    params: { id: number };
};

const Page: NextPage<Params> = ({ params: { id } }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<UserGetType | null>(null);

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

    return (
        <>
            <p className="text-2xl font-bold">User - View</p>

            <LoadingSpinner loading={loading}>
                {data?.picture && (
                    <CustomBox text="Picture">
                        <div className="flex items-center justify-center flex-col">
                            <a className="flex justify-center" href={data.picture.url} target="_blank">
                                <img src={data.picture.url} alt={"Picture admin"} className="max-w-md h-full object-cover w-full" />
                            </a>
                        </div>
                    </CustomBox>
                )}

                <CustomBox text="Basic information">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div>
                            <StyleInput value={data?.id} disabled title={"Id"} />
                        </div>

                        <div>
                            <StyleInput value={data?.use_name} disabled title={"Name"} />
                        </div>

                        <div>
                            <StyleInput value={data?.use_cpf} disabled title={"CPF"} />
                        </div>

                        <div>
                            <StyleInput value={data?.email} disabled title={"Email"} />
                        </div>

                        <div>
                            <StyleInput
                                value={data?.use_birth_date ? format(new Date(data.use_birth_date), "dd/MM/yyyy") : ""}
                                disabled
                                title={"Birthday"}
                            />
                        </div>

                        <div>
                            <StyleInput value={data?.use_phone} disabled title={"Phone"} />
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

                <CustomBox text="Orders">
                    <CustomTable request={(e) => getDatatable({ ...e, id_user: data?.id })} button_view url={"/order"}>
                        <Column field="id" header="Id" />
                        <Column field="item_count" header="Quantity of items" />
                        <Column field="order_value" header="Value" body={(e) => formatBRL(e.order_value)} />
                        <Column field="status" header="Status" body={(e) => <p style={{ color: e.status_color }}>{e.status}</p>} />
                        <Column field="created_at" header="Date" body={(e) => format(new Date(e.created_at), "dd/MM/yyyy HH:mm:ss")} />
                    </CustomTable>
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
