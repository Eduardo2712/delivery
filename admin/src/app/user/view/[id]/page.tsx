"use client";

import { NextPage } from "next";
import LoadingSpinner from "@/components/loading-spinner";
import { useState, useEffect } from "react";
import CustomBox from "@/components/custom-box";
import StyleInput from "@/components/style-input";
import axios, { HttpStatusCode } from "axios";
import toast from "react-hot-toast";
import { get } from "@/requests/user.request";
import { format, parseISO } from "date-fns";
import { UserGetType } from "@/types/request/user.type";
import CustomTable from "@/components/custom-table";
import { Column } from "primereact/column";
import { getDatatable } from "@/requests/order.request";
import { formatBRL } from "@/utils/other";

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
                            <a className="flex justify-center" href={data.picture.fil_url} target="_blank">
                                <img src={data.picture.fil_url} alt={"Picture admin"} className="max-w-md h-full object-cover w-full" />
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
                                value={data?.use_date_birth ? format(new Date(data.use_date_birth), "dd/MM/yyyy") : ""}
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
                        <Column field="items_count" header="Quantity of items" />
                        <Column field="order_value" header="Value" body={(e) => formatBRL(e.order_value)} />
                        <Column field="created_at" header="Date" body={(e) => format(new Date(e.created_at), "dd/MM/yyyy HH:mm:ss")} />
                    </CustomTable>
                </CustomBox>
            </LoadingSpinner>
        </>
    );
};

export default Page;
