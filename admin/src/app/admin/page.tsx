"use client";

import CustomTable from "@/components/custom-table";
import { getDatatable } from "@/requests/admin.request";
import { NextPage } from "next";
import { Column } from "primereact/column";

const Page: NextPage = () => {
    return (
        <div className={`flex min-h-full flex-col justify-center mx-auto gap-5 rounded px-3 py-4 bg-slate-800`}>
            <p className="text-2xl font-bold">Admin</p>

            <div className="w-full">
                <CustomTable request={getDatatable} button_edit button_delete button_view>
                    <Column field="id" header="Id" />
                    <Column field="adm_name" header="Name" />
                    <Column field="email" header="Email" />
                    <Column field="adm_phone" header="Phone" />
                </CustomTable>
            </div>
        </div>
    );
};

export default Page;
