import { AxiosResponse } from "axios";
import { DataTable } from "primereact/datatable";
import { useState, ReactNode, useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
    request: (props: any) => Promise<AxiosResponse>;
    children: ReactNode;
};

type Params = {
    search: string;
    page: number;
    rows_per_page: number;
};

const CustomTable = ({ children, request }: Props) => {
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
            >
                {children}
            </DataTable>
        </>
    );
};

export default CustomTable;
