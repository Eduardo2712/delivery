import { AxiosResponse } from "axios";
import Link from "next/link";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa6";

type Props = {
    request: (props: Params) => Promise<AxiosResponse>;
    children: ReactNode;
    button_edit?: boolean;
    button_delete?: boolean;
    button_view?: boolean;
    url?: string;
    delete_request?: (id: number) => Promise<AxiosResponse>;
};

type Params = {
    search: string;
    page: number;
    rows_per_page: number;
};

type DataItem<T> = {
    [key: string]: T;
};

const CustomTable = ({ children, request, button_delete = false, button_edit = false, button_view = false, url = "/", delete_request }: Props) => {
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

    const confirmDeleteRow = (id: number) => {
        toast(
            (t) => (
                <div className="flex flex-col gap-6">
                    <p className="text-lg">Do you really want to delete?</p>

                    <div className="flex gap-2">
                        <button
                            className="rounded bg-red-600 flex-1 h-8 flex justify-center items-center"
                            type="button"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            No
                        </button>

                        <button
                            className="rounded bg-blue-600 flex-1 h-8 flex justify-center items-center"
                            type="button"
                            onClick={() => {
                                toast.dismiss(t.id);
                                deleteRow(id);
                            }}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            ),
            {
                duration: Infinity
            }
        );
    };

    const deleteRow = async (id: number) => {
        try {
            const response = await delete_request!(id);

            if (response.status !== 200) {
                return toast.error(response.data.message);
            }

            toast.success("Deleted successfully");

            fetchData();
        } catch (error: any) {
            return toast.error(error ?? "An error has occurred");
        }
    };

    useEffect(() => {
        fetchData();
    }, [params]);

    const buttons = (e: DataItem<number>) => {
        return (
            <div className="flex gap-2">
                {button_edit && url && (
                    <button
                        type="button"
                        className="bg-green-600 hover:bg-green-700 rounded px-2 py-2 text-gray-100 h-9 w-9 flex text-center items-center justify-center"
                    >
                        <FaPen />
                    </button>
                )}

                {button_view && url && (
                    <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 rounded px-2 py-2 text-gray-100 h-9 w-9 flex text-center items-center justify-center"
                    >
                        <FaEye />
                    </button>
                )}

                {button_delete && delete_request && (
                    <button
                        type="button"
                        className="bg-red-600 hover:bg-red-700 rounded px-2 py-2 text-gray-100 h-9 w-9 flex text-center items-center justify-center"
                        onClick={() => confirmDeleteRow(e.id)}
                    >
                        <FaTrash />
                    </button>
                )}
            </div>
        );
    };

    return (
        <>
            <div className="flex gap-4">
                <div className="mb-4 flex items-center justify-start flex-1">
                    <Link href={`${url}/create`} className="bg-blue-700 flex items-center gap-3 rounded px-3 py-2 text-gray-100">
                        <FaPlus fontSize={18} className="cursor-pointer" />
                        New
                    </Link>
                </div>

                <div className="mb-4 flex items-center justify-end flex-1">
                    <input
                        className="block w-80 rounded-md border-0 py-1.5 px-2 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-blue-800 sm:text-sm sm:leading-6 bg-gray-700"
                        placeholder="Search..."
                        value={params.search}
                        onChange={(e) => setParams({ ...params, search: e.target.value })}
                    />
                </div>
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
                onPage={(e) => setParams({ ...params, rows_per_page: e.rows, page: (e.page ?? 0) + 1 })}
            >
                {children}

                {(button_edit || button_delete || button_view) && (
                    <Column className="w-12 min-w-12" field="options" header="Options" body={buttons} />
                )}
            </DataTable>
        </>
    );
};

export default CustomTable;
