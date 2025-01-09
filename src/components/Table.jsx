import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";

const Table = ({ columns, data, loading, showFavorites }) => {
  const { favoriteData, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const dataTable = useMemo(() => data, [data]);

  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative">
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
              {showFavorites && <th className="py-3 px-4 border-b"></th>}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={
                showFavorites &&
                favoriteData.some((fav) => fav.id === row.original.id)
                  ? "bg-yellow-100"
                  : ""
              }
            >
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
                      ? () =>
                          navigate(`/item/${row.original.id}`, {
                            state: row.original,
                          })
                      : undefined
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}

              {showFavorites && (
                <td
                  className="p-2 border-b"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(row.original);
                  }}
                >
                  {favoriteData.some((fav) => fav.id === row.original.id) ? (
                    <FaStar className="text-yellow-500" size={24} />
                  ) : (
                    <CiStar className="cursor-pointer" size={24} />
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
