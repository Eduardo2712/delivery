"use client";

import CustomBox from "@/components/custom-box";
import CustomTable from "@/components/custom-table";
import { getDatatable } from "@/requests/order.request";
import { format, parseISO } from "date-fns";
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
                        <Column field="user.use_name" header="User" />
                        <Column field="created_at" header="Created at" body={(e) => format(parseISO(String(e.created_at)), "dd/MM/yyyy HH:mm:ss")} />
                    </CustomTable>
                </div>
            </CustomBox>
        </>
    );
};

export default Page;
