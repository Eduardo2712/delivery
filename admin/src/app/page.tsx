"use client";

import { get } from "@/requests/dashboard.request";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Request = {
    admin_count: number;
    user_count: number;
};

const Page: NextPage = () => {
    const [data, setData] = useState<Request>({
        admin_count: 0,
        user_count: 0
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await get();

                if (response.status !== 200) {
                    return toast.error(response.data.message);
                }

                setData(response.data);
            } catch (error: any) {
                return toast.error(error ?? "An error has occurred");
            }
        })();
    }, []);

    return (
        <div className="flex min-h-full flex-col justify-center mx-auto container gap-5 mt-4 xl:flex-row px-2">
            <div className="w-full flex flex-col md:flex-row gap-5">
                <div className="bg-gray-800 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-600">
                    <p className="text-gray-400 font-extrabold text-xl">Admins</p>

                    <p className="text-white font-bold text-xl">{data.admin_count}</p>
                </div>

                <div className="bg-gray-800 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-600">
                    <p className="text-gray-400 font-extrabold text-xl">Users</p>

                    <p className="text-white font-bold text-xl">{data.user_count}</p>
                </div>

                <div className="bg-gray-800 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-600">
                    <p className="text-gray-400 font-extrabold text-xl">Products</p>

                    <p className="text-white font-bold text-xl">1</p>
                </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-5">
                <div className="bg-gray-800 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-600">
                    <p className="text-gray-400 font-extrabold text-xl">Orders</p>

                    <p className="text-white font-bold text-xl">1</p>
                </div>

                <div className="bg-gray-800 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-600">
                    <p className="text-gray-400 font-extrabold text-xl">Values</p>

                    <p className="text-white font-bold text-xl">1</p>
                </div>

                <div className="bg-gray-800 w-full px-8 rounded-md h-20 flex justify-center flex-col items-center border-b-2 border-b-blue-600">
                    <p className="text-gray-400 font-extrabold text-xl">Itens</p>

                    <p className="text-white font-bold text-xl">1</p>
                </div>
            </div>
        </div>
    );
};

export default Page;
