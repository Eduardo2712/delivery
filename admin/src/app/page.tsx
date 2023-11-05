"use client";

import CustomBox from "@/components/custom-box";
import { get } from "@/requests/dashboard.request";
import { DashboardGetType } from "@/types/request/dashboard.type";
import { formatBRL } from "@/utils/other";
import axios, { HttpStatusCode } from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<DashboardGetType>({
        admin_count: 0,
        user_count: 0,
        items_count: 0,
        order_count: 0,
        product_count: 0,
        value_amount: 0
    });

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const response = await get();

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
            <p className="text-2xl font-bold">Dashboard</p>

            <CustomBox loading={loading}>
                <div className="w-full flex flex-col lg:flex-row gap-5">
                    <div className="bg-gray-700 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-700">
                        <p className="text-gray-400 font-extrabold text-lg mb-2">Admins</p>

                        <p className="text-white font-bold text-lg">{data.admin_count}</p>
                    </div>

                    <div className="bg-gray-700 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-700">
                        <p className="text-gray-400 font-extrabold text-lg mb-2">Users</p>

                        <p className="text-white font-bold text-lg">{data.user_count}</p>
                    </div>

                    <div className="bg-gray-700 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-700">
                        <p className="text-gray-400 font-extrabold text-lg mb-2">Products</p>

                        <p className="text-white font-bold text-lg">{data.product_count}</p>
                    </div>
                </div>

                <div className="w-full flex flex-col lg:flex-row gap-5">
                    <div className="bg-gray-700 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-700">
                        <p className="text-gray-400 font-extrabold text-lg mb-2">Orders</p>

                        <p className="text-white font-bold text-lg">{data.order_count}</p>
                    </div>

                    <div className="bg-gray-700 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-700">
                        <p className="text-gray-400 font-extrabold text-lg mb-2">Value on orders</p>

                        <p className="text-white font-bold text-lg">{formatBRL(data.value_amount)}</p>
                    </div>

                    <div className="bg-gray-700 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-700">
                        <p className="text-gray-400 font-extrabold text-lg mb-2">Items on orders</p>

                        <p className="text-white font-bold text-lg">{data.items_count}</p>
                    </div>
                </div>
            </CustomBox>
        </>
    );
};

export default Page;
