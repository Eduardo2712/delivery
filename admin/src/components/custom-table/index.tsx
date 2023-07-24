import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

type Person = {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    status: string;
    progress: number;
};

const defaultData: Person[] = [
    {
        firstName: "tanner",
        lastName: "linsley",
        age: 24,
        visits: 100,
        status: "In Relationship",
        progress: 50
    },
    {
        firstName: "tandy",
        lastName: "miller",
        age: 40,
        visits: 40,
        status: "Single",
        progress: 80
    },
    {
        firstName: "joe",
        lastName: "dirte",
        age: 45,
        visits: 20,
        status: "Complicated",
        progress: 10
    }
];

const columnHelper = createColumnHelper<Person>();

const columns = [
    columnHelper.accessor("firstName", {
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>
    }),
    columnHelper.accessor("age", {
        header: () => "Age",
        cell: (info) => info.renderValue()
    }),
    columnHelper.accessor("visits", {
        header: () => <span>Visits</span>
    }),
    columnHelper.accessor("status", {
        header: "Status"
    }),
    columnHelper.accessor("progress", {
        header: "Profile Progress"
    })
];

const CustomTable = () => {
    const [data, setData] = useState(() => [...defaultData]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div className="w-full h-full overflow-x-auto">
            <table className="table w-full border-gray-200 border-2">
                <thead className="border-b-gray-200 border-b-2">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="flex-1">
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;
