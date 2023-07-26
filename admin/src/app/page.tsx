"use client";

import { get } from "@/requests/dashboard.request";
import { DashboardReturnType } from "@/types/page/index.type";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<DashboardReturnType>({
        admin_count: 0,
        user_count: 0,
        itens_count: 0,
        order_count: 0,
        product_count: 0,
        value_amount: 0
    });

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const response = await get();

                if (response.status !== 200) {
                    return toast.error(response.data.message);
                }

                setData(response.data);
            } catch (error: any) {
                return toast.error(error ?? "An error has occurred");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div
            className={`flex min-h-full flex-col justify-center mx-auto gap-5 mt-4 rounded px-3 py-4 bg-slate-800 ${loading ? "animate-pulse" : ""}`}
        >
            <p className="text-2xl font-bold">Dashboard</p>

            <div className="w-full flex flex-col lg:flex-row gap-5">
                <div className="bg-gray-700 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-700">
                    <p className="text-gray-400 font-extrabold text-xl">Admins</p>

                    <p className="text-white font-bold text-xl">{data.admin_count}</p>
                </div>

                <div className="bg-gray-700 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-700">
                    <p className="text-gray-400 font-extrabold text-xl">Users</p>

                    <p className="text-white font-bold text-xl">{data.user_count}</p>
                </div>

                <div className="bg-gray-700 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-700">
                    <p className="text-gray-400 font-extrabold text-xl">Products</p>

                    <p className="text-white font-bold text-xl">{data.product_count}</p>
                </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-5">
                <div className="bg-gray-700 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-700">
                    <p className="text-gray-400 font-extrabold text-xl">Orders</p>

                    <p className="text-white font-bold text-xl">{data.order_count}</p>
                </div>

                <div className="bg-gray-700 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-700">
                    <p className="text-gray-400 font-extrabold text-xl">Values</p>

                    <p className="text-white font-bold text-xl">{data.value_amount}</p>
                </div>

                <div className="bg-gray-700 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-700">
                    <p className="text-gray-400 font-extrabold text-xl">Itens</p>

                    <p className="text-white font-bold text-xl">{data.itens_count}</p>
                </div>
            </div>
        </div>
    );
};

export default Page;
