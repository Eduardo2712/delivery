"use client";

import { NextPage } from "next";
import LoadingSpinner from "@/components/loading-spinner";
import { useState } from "react";

type Params = {
    params: { id: number };
};

const Page: NextPage<Params> = ({ params }) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <>
            <p className="text-2xl font-bold">User - View</p>

            <LoadingSpinner loading={loading}>
                <div></div>
            </LoadingSpinner>
        </>
    );
};

export default Page;
