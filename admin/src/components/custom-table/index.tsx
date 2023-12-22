import useDebounce from "@/hooks/debounce";
import { toastConfirm } from "@/utils/toast";
import axios, { AxiosResponse, HttpStatusCode } from "axios";
import Link from "next/link";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, ReactNode, useEffect, ReactElement } from "react";
import toast from "react-hot-toast";
import { FaArrowsRotate, FaEye, FaPen, FaTrash } from "react-icons/fa6";

type Props = {
    request: (props: Params) => Promise<AxiosResponse>;
    children: ReactNode;
    button_edit?: boolean;
    button_delete?: boolean;
    button_view?: boolean;
    url?: string;
    delete_request?: (id: number) => Promise<AxiosResponse>;
    buttons_top?: ReactElement | null;
};

type Params = {
    search: string;
    page: number;
    rows_per_page: number;
    id_user?: number | null;
};

type DataItem<T> = {
    [key: string]: T;
};

const CustomTable = ({
    children,
    request,
    button_delete = false,
    button_edit = false,
    button_view = false,
    url = "/",
    delete_request,
    buttons_top = null
}: Props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [params, setParams] = useState<Params>({
        search: "",
        page: 1,
        rows_per_page: 10,
        id_user: null
    });
    const debouncedInputValue = useDebounce(params.search, 500);

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await request({ ...params });

            if (response.status !== HttpStatusCode.Ok) {
                return toast.error(response.data.message);
            }

            setData(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data?.message ?? "An error has occurred");
            } else {
                return toast.error("An error has occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const confirmDeleteRow = (id: number) => {
        toastConfirm("Do you really want to delete?", () => {
            deleteRow(id);
        });
    };

    const deleteRow = async (id: number) => {
        try {
            const response = await delete_request!(id);

            if (response.status !== HttpStatusCode.Ok) {
                return toast.error(response.data.message);
            }

            toast.success("Deleted successfully");

            fetchData();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data?.message ?? "An error has occurred");
            } else {
                return toast.error("An error has occurred");
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.page, params.rows_per_page, debouncedInputValue]);

    const buttons = (e: DataItem<number>) => {
        return (
            <div className="flex gap-2 justify-center">
                {button_edit && url && (
                    <Link
                        href={`${url}/edit/${e.id}`}
                        className="bg-green-600 hover:bg-green-700 rounded px-2 py-2 text-gray-100 h-9 w-9 flex text-center items-center justify-center"
                    >
                        <FaPen />
                    </Link>
                )}

                {button_view && url && (
                    <Link
                        href={`${url}/view/${e.id}`}
                        className="bg-blue-600 hover:bg-blue-700 rounded px-2 py-2 text-gray-100 h-9 w-9 flex text-center items-center justify-center"
                    >
                        <FaEye />
                    </Link>
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
            <div className="flex flex-col gap-1 lg:flex-row">
                {buttons_top}

                <div className="mb-4 flex items-center justify-end flex-1 gap-2">
                    <input
                        className="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-blue-800 sm:text-sm sm:leading-6 bg-gray-700"
                        placeholder="Search..."
                        value={params.search}
                        onChange={(e) => setParams({ ...params, search: e.target.value })}
                    />

                    <button type="button" className="bg-blue-700 hover:bg-blue-800 rounded px-2 py-2" onClick={fetchData}>
                        <FaArrowsRotate className={loading ? "animate-spin" : ""} onClick={fetchData} />
                    </button>
                </div>
            </div>

            <DataTable
                value={data}
                className="table-auto w-full"
                showGridlines
                stripedRows
                scrollable
                emptyMessage={"No data"}
                paginator
                rows={params.rows_per_page}
                rowsPerPageOptions={[10, 25, 50]}
                loading={loading}
                onPage={(e) => setParams({ ...params, rows_per_page: e.rows, page: (e.page ?? 0) + 1 })}
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
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
