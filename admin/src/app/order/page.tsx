"use client";

import CustomBox from "@/components/custom-box";
import CustomTable from "@/components/custom-table";
import { getDatatable } from "@/requests/order.request";
import { formatBRL } from "@/utils/other";
import { NextPage } from "next";
import { Column } from "primereact/column";

const Page: NextPage = () => {
    return (
        <>
            <p className="text-2xl font-bold">Order</p>

            <CustomBox>
                <div className="w-full">
                    <CustomTable request={getDatatable} button_view url={"/order"}>
                        <Column field="id" header="Id" />
                        <Column field="pro_name" header="Name" />
                        <Column field="pro_status" header="Status" body={(e) => (e.pro_status ? "Enabled" : "Disabled")} />
                        <Column field="pro_price" header="Price" body={(e) => formatBRL(e.pro_price)} />
                    </CustomTable>
                </div>
            </CustomBox>
        </>
    );
};

export default Page;
