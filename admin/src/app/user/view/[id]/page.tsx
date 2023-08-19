"use client";

import { NextPage } from "next";
import LoadingSpinner from "@/components/loading-spinner";
import { useState, useEffect } from "react";
import CustomBox from "@/components/custom-box";
import StyleInput from "@/components/style-input";
import axios, { HttpStatusCode } from "axios";
import toast from "react-hot-toast";
import { get } from "@/requests/user.request";
import { UserType } from "@/types/request/user.type";
import { format, parseISO } from "date-fns";

type Params = {
    params: { id: number };
};

const Page: NextPage<Params> = ({ params }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<UserType | null>(null);

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

    return (
        <>
            <p className="text-2xl font-bold">User - View</p>

            <LoadingSpinner loading={loading}>
                <CustomBox>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div>
                            <StyleInput value={data?.id} disabled title={"ID"} />
                        </div>

                        <div>
                            <StyleInput value={data?.use_name} disabled title={"Name"} />
                        </div>

                        <div>
                            <StyleInput value={data?.email} disabled title={"Email"} />
                        </div>

                        <div>
                            <StyleInput
                                value={data?.use_date_birth ? format(parseISO(String(data.use_date_birth)), "dd/MM/yyyy") : ""}
                                disabled
                                title={"Birthday"}
                            />
                        </div>

                        <div>
                            <StyleInput value={data?.use_phone} disabled title={"Phone"} />
                        </div>

                        <div>
                            <StyleInput
                                value={data?.created_at ? format(parseISO(String(data.created_at)), "dd/MM/yyyy HH:mm:ss") : ""}
                                disabled
                                title={"Created at"}
                            />
                        </div>

                        <div>
                            <StyleInput
                                value={data?.updated_at ? format(parseISO(String(data.updated_at)), "dd/MM/yyyy HH:mm:ss") : ""}
                                disabled
                                title={"Updated at"}
                            />
                        </div>
                    </div>
                </CustomBox>
            </LoadingSpinner>
        </>
    );
};

export default Page;
