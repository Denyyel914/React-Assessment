import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoriteSlice";

const Table = ({ columns, data, showFavorites }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const dataTable = useMemo(() => data, [data]);

  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleRowClick = (row) => {
    dispatch(toggleFavorite(row));
  };

  return (
    <div>
      <table className="mt-5 w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-3 px-4 text-left border-b capitalize"
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
            <tr
              key={row.id}
              className={
                showFavorites &&
                favorites.some((fav) => fav.id === row.original.id)
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
                      ? () => navigate(`/item/${row.original.id}`)
                      : undefined
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              {showFavorites && (
                <td
                  className="p-2 border-b cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRowClick(row.original);
                  }}
                >
                  {favorites.some((fav) => fav.id === row.original.id) ? (
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
