"use client";

import CustomBox from "@/components/custom-box";
import CustomTable from "@/components/custom-table";
import { getDatatable, remove } from "@/requests/admin.request";
import { NextPage } from "next";
import { Column } from "primereact/column";

const Page: NextPage = () => {
    return (
        <>
            <p className="text-2xl font-bold">Admin</p>

            <CustomBox>
                <div className="w-full">
                    <CustomTable request={getDatatable} button_edit button_delete button_view url={"/admin"} delete_request={remove}>
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
