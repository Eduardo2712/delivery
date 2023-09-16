"use client";

import CustomBox from "@/components/custom-box";
import CustomTable from "@/components/custom-table";
import { getDatatable, remove } from "@/requests/admin.request";
import { NextPage } from "next";
import Link from "next/link";
import { Column } from "primereact/column";
import { FaPlus } from "react-icons/fa6";

const Page: NextPage = () => {
    const buttons_top = (
        <div className="mb-4 flex items-center justify-start flex-1">
            <Link href={`admin/create`} className="bg-blue-700 flex items-center gap-3 rounded px-3 py-2 text-gray-100 font-semibold">
                <FaPlus fontSize={18} className="cursor-pointer" />
                New
            </Link>
        </div>
    );

    return (
        <>
            <p className="text-2xl font-bold">Admin</p>

            <CustomBox>
                <div className="w-full">
                    <CustomTable request={getDatatable} button_edit button_delete url={"/admin"} delete_request={remove} buttons_top={buttons_top}>
                        <Column field="id" header="Id" />
                        <Column field="adm_name" header="Name" />
                        <Column field="email" header="Email" />
                        <Column field="adm_phone" header="Phone" />
                    </CustomTable>
                </div>
            </CustomBox>
        </>
    );
};

export default Page;
