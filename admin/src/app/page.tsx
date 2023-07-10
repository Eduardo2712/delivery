"use client";

import { NextPage } from "next";

const Page: NextPage = () => {
    return (
        <div className="flex min-h-full flex-row justify-center mx-auto container gap-5 mt-4">
            <div className="bg-gray-800 columns-3 flex-1 px-8 rounded-md h-24 flex justify-center flex-col items-center">
                <p className="text-white font-extrabold text-xl">Admins</p>

                <p className="text-gray-400 font-bold text-xl">1</p>
            </div>

            <div className="bg-gray-800 columns-3 flex-1 px-8 rounded-md h-24 flex justify-center flex-col items-center">
                <p className="text-white font-extrabold text-xl">Users</p>

                <p className="text-gray-400 font-bold text-xl">1</p>
            </div>

            <div className="bg-gray-800 columns-3 flex-1 px-8 rounded-md h-24 flex justify-center flex-col items-center">
                <p className="text-white font-extrabold text-xl">Products</p>

                <p className="text-gray-400 font-bold text-xl">1</p>
            </div>
        </div>
    );
};

export default Page;
