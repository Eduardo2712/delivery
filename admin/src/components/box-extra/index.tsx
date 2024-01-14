import { Column } from "primereact/column";
import CustomBox from "../custom-box";
import { DataTable } from "primereact/datatable";
import TextEmpty from "../text-empty";
import { ExtraType } from "@/types/entity/entity.type";
import { FormikErrors } from "formik";
import { ProductCreateType } from "@/types/request/product.type";

type Props = {
    loading: boolean;
    extras: ExtraType[];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<ProductCreateType>>;
};

const BoxExtra = ({ loading, extras, setFieldValue }: Props) => {
    return (
        <CustomBox text="Extras">
            {extras.length > 0 ? (
                <div className="w-full">
                    <DataTable
                        value={extras ?? []}
                        className="table-auto w-full"
                        showGridlines
                        stripedRows
                        scrollable={true}
                        emptyMessage={"No data"}
                        paginator
                        loading={loading}
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    >
                        <Column field="admin" header="Admin" />
                    </DataTable>
                </div>
            ) : (
                <TextEmpty text="No extras" />
            )}
        </CustomBox>
    );
};

export default BoxExtra;
