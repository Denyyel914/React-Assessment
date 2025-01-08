import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Table = ({ columns, data, loading }) => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const dataTable = useMemo(() => data, [data]);

  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (row) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.some(({ id }) => id === row.id)
        ? prevSelectedRows.filter(({ id }) => id !== row.id)
        : [...prevSelectedRows, row]
    );
  };

  return (
    <div className="relative">
      {/* Spinner centered in the table */}
      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-50">
          <Loader2 className="animate-spin text-gray-500" size={40} />
        </div>
      )}

      <table className="mt-5 w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-3 px-4 text-left border-b text-black-700 font-medium text-sm uppercase"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              <th className="py-3 px-4 border-b"></th>
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`p-2 border-b ${
                    cell.column.id === "id"
                      ? "text-[#0077D4] cursor-pointer hover:underline"
                      : ""
                  }`}
                  onClick={
                    cell.column.id === "id"
                      ? () => navigate(`/row/${row.original.id}`)
                      : undefined
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td
                className="p-2 border-b border-[#C3C6CF] text-[#1A1C1E] font-normal text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRowClick(row.original);
                }}
              >
                {selectedRows.some(
                  (selectedRow) => selectedRow.id === row.original.id
                ) ? (
                  <FaStar className="text-yellow-500" size={24} />
                ) : (
                  <CiStar className="cursor-pointer" size={24} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
