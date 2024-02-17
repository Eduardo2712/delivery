import { Column } from "primereact/column";
import CustomBox from "../custom-box";
import { DataTable } from "primereact/datatable";
import TextEmpty from "../text-empty";
import { FormikErrors } from "formik";
import { ProductCreateType, ProductUpdateType } from "@/types/request/product.type";
import AutocompleteExtra from "../autocomplete-extra";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { useState } from "react";
import { ExtraType } from "@/types/entity/entity.type";
import toast from "react-hot-toast";
import { formatBRL } from "@/utils/other";
import { toastConfirm } from "@/utils/toast";

type Props = {
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<ProductCreateType & ProductUpdateType>>;
    values: ProductCreateType & ProductUpdateType;
};

const BoxExtra = ({ setFieldValue, values }: Props) => {
    const [extra, setExtra] = useState<ExtraType | undefined>(undefined);

    const addExtra = () => {
        if (!extra) {
            return toast.error("Please select an extra");
        }

        setFieldValue("extras", [...values.extras, extra]);
        setExtra(undefined);
    };

    const deleteRow = (id: number) => {
        toastConfirm("Do you really want to delete?", () => {
            setFieldValue(
                "extras",
                values.extras.filter((extra) => extra.id !== id)
            );
        });
    };

    return (
        <CustomBox text="Extras">
            <div className="grid lg:grid-cols-3 lg:gap-2">
                <div className="col-span-2 flex items-center">
                    <AutocompleteExtra value={extra} setValue={(value) => setExtra(value ?? undefined)} array_used={values.extras.map((e) => e.id)} />
                </div>

                <div className="col-span-1 flex items-center">
                    <button
                        type="button"
                        onClick={addExtra}
                        className="flex gap-2 h-14 items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 w-36 mt-2"
                    >
                        <FaPlus fontSize={18} className="text-white" /> Add
                    </button>
                </div>
            </div>

            {values.extras.length > 0 ? (
                <div className="w-full">
                    <DataTable
                        value={values.extras ?? []}
                        className="table-auto w-full"
                        showGridlines
                        stripedRows
                        scrollable={true}
                        emptyMessage={"No data"}
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    >
                        <Column field="ext_name" header="Name" />
                        <Column field="ext_price" header="Price" body={(e) => formatBRL(e.ext_price)} />
                        <Column
                            header="Action"
                            style={{ width: "100px" }}
                            body={(e) => (
                                <button
                                    type="button"
                                    className="bg-red-600 hover:bg-red-700 rounded px-2 py-2 text-gray-100 h-9 w-9 flex text-center items-center justify-center"
                                    onClick={() => deleteRow(e.id)}
                                >
                                    <FaTrash />
                                </button>
                            )}
                        />
                    </DataTable>
                </div>
            ) : (
                <TextEmpty text="No extras" />
            )}
        </CustomBox>
    );
};

export default BoxExtra;
