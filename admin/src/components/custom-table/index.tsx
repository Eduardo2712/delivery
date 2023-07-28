import { AxiosResponse } from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { FaEye, FaPen, FaTrash } from "react-icons/fa6";

type Props = {
    request: (props: Params) => Promise<AxiosResponse>;
    children: ReactNode;
    button_edit?: boolean;
    button_delete?: boolean;
    button_view?: boolean;
};

type Params = {
    search: string;
    page: number;
    rows_per_page: number;
};

const CustomTable = ({ children, request, button_delete = false, button_edit = false, button_view = false }: Props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [params, setParams] = useState<Params>({
        search: "",
        page: 1,
        rows_per_page: 10
    });

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await request({ ...params });

            if (response.status !== 200) {
                return toast.error(response.data.message);
            }

            setData(response.data);
        } catch (error: any) {
            return toast.error(error ?? "An error has occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params]);

    return (
        <>
            <div className="mb-4 flex items-center justify-end">
                <input
                    className="block w-80 rounded-md border-0 py-1.5 px-2 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-blue-800 sm:text-sm sm:leading-6 bg-gray-700"
                    placeholder="Search..."
                    value={params.search}
                    onChange={(e) => setParams({ ...params, search: e.target.value })}
                />
            </div>

            <DataTable
                value={data}
                className="table-auto w-full"
                showGridlines
                stripedRows
                scrollable={true}
                emptyMessage={"No data"}
                paginator
                rows={params.rows_per_page}
                rowsPerPageOptions={[10, 25, 50]}
                loading={loading}
                onPage={(e) => setParams({ ...params, rows_per_page: e.rows, page: e.page ?? 1 })}
            >
                {children}

                {(button_edit || button_delete || button_view) && (
                    <Column
                        className="w-12 min-w-12"
                        field="options"
                        header="Options"
                        body={() => {
                            return (
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="bg-green-600 hover:bg-green-700 rounded px-2 py-2 text-gray-100 h-9 w-9 flex text-center items-center justify-center"
                                    >
                                        <FaPen />
                                    </button>

                                    <button
                                        type="button"
                                        className="bg-blue-600 hover:bg-blue-700 rounded px-2 py-2 text-gray-100 h-9 w-9 flex text-center items-center justify-center"
                                    >
                                        <FaEye />
                                    </button>

                                    <button
                                        type="button"
                                        className="bg-red-600 hover:bg-red-700 rounded px-2 py-2 text-gray-100 h-9 w-9 flex text-center items-center justify-center"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            );
                        }}
                    />
                )}
            </DataTable>
        </>
    );
};

export default CustomTable;
