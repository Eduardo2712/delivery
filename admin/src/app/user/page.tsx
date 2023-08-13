"use client";

import CustomBox from "@/components/custom-box";
import CustomTable from "@/components/custom-table";
import { getDatatable, remove } from "@/requests/user.request";
import { NextPage } from "next";
import { Column } from "primereact/column";

const Page: NextPage = () => {
    return (
        <>
            <p className="text-2xl font-bold">User</p>

            <CustomBox>
                <div className="w-full">
                    <CustomTable request={getDatatable} button_delete button_view url={"/user"} delete_request={remove}>
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
