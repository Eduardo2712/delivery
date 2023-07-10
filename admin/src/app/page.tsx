"use client";

import { NextPage } from "next";

const Page: NextPage = () => {
    return (
        <div className="flex min-h-full flex-col justify-center mx-auto container gap-5 mt-4 xl:flex-row px-2">
            <div className="w-full flex flex-col md:flex-row gap-5">
                <div className="bg-gray-800 w-full px-8 rounded-md h-24 flex justify-center flex-col items-center border-b-2 border-b-blue-600">
                    <p className="text-gray-400 font-extrabold text-xl">Admins</p>

                    <p className="text-white font-bold text-xl">1</p>
                </div>

                <div className="bg-gray-800 w-full px-8 rounded-md h-24 flex justify-center flex-col items-center border-b-2 border-b-blue-600">
                    <p className="text-gray-400 font-extrabold text-xl">Users</p>

                    <p className="text-white font-bold text-xl">1</p>
                </div>

                <div className="bg-gray-800 w-full px-8 rounded-md h-24 flex justify-center flex-col items-center border-b-2 border-b-blue-600">
                    <p className="text-gray-400 font-extrabold text-xl">Products</p>

                    <p className="text-white font-bold text-xl">1</p>
                </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-5">
                <div className="bg-gray-800 w-full px-8 rounded-md h-24 flex justify-center flex-col items-center border-b-2 border-b-blue-600">
                    <p className="text-gray-400 font-extrabold text-xl">Orders</p>

                    <p className="text-white font-bold text-xl">1</p>
                </div>

                <div className="bg-gray-800 w-full px-8 rounded-md h-24 flex justify-center flex-col items-center border-b-2 border-b-blue-600">
                    <p className="text-gray-400 font-extrabold text-xl">Value in sales</p>

                    <p className="text-white font-bold text-xl">1</p>
                </div>

                <div className="bg-gray-800 w-full px-8 rounded-md h-24 flex justify-center flex-col items-center border-b-2 border-b-blue-600">
                    <p className="text-gray-400 font-extrabold text-xl">Itens</p>

                    <p className="text-white font-bold text-xl">1</p>
                </div>
            </div>
        </div>
    );
};

export default Page;
