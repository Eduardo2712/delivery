"use client";

import CustomTable from "@/components/custom-table";
import { NextPage } from "next";
import { useState } from "react";

const Page: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className={`flex min-h-full flex-col justify-center mx-auto container gap-5 mt-4 px-2 ${loading ? "animate-pulse" : ""}`}>
            <p className="text-2xl font-bold">Admin</p>

            <div className="w-full flex flex-col lg:flex-row gap-5">
                <CustomTable />
            </div>
        </div>
    );
};

export default Page;
