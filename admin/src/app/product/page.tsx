"use client";

import CustomBox from "@/components/custom-box";
import CustomTable from "@/components/custom-table";
import { getDatatable, remove } from "@/requests/product.request";
import { formatBRL } from "@/utils/other";
import { NextPage } from "next";
import Link from "next/link";
import { Column } from "primereact/column";
import { FaPlus } from "react-icons/fa6";

const Page: NextPage = () => {
    const buttonsTop = (
        <div className="mb-4 flex items-center justify-start flex-1">
            <Link href={`product/create`} className="bg-blue-700 flex items-center gap-3 rounded px-3 py-2 text-gray-100 font-semibold">
                <FaPlus fontSize={18} className="cursor-pointer" />
                New
            </Link>
        </div>
    );

    return (
        <>
            <p className="text-2xl font-bold">Product</p>

            <CustomBox>
                <div className="w-full">
                    <CustomTable request={getDatatable} button_edit button_delete url={"/product"} delete_request={remove} buttons_top={buttonsTop}>
                        <Column field="id" header="Id" />
                        <Column field="pro_name" header="Name" />
                        <Column field="pro_price" header="Price" body={(e) => formatBRL(e.price)} />
                    </CustomTable>
                </div>
            </CustomBox>
        </>
    );
};

export default Page;
