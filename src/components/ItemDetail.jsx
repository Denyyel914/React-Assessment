import { useParams } from "react-router-dom";
import { useMemo } from "react";
import data from "../data/Mock_Data.json";
import Table from "./Table";

const ItemDetail = () => {
  const { id } = useParams();

  const item = useMemo(() => {
    return data.find((item) => item.id === parseInt(id));
  }, [id]);
  const dataTable = useMemo(() => [item], [item]);

  if (!item) {
    return <h2>Item not found</h2>;
  }

  const columns = [
    { Header: "ID", accessorKey: "id" },
    { Header: "Title", accessorKey: "title" },
    { Header: "Description", accessorKey: "description" },
    { Header: "Price", accessorKey: "price" },
    {
      Header: "Image",
      accessorKey: "image",
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.title}
          className="h-12 w-12 object-cover rounded"
        />
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl mb-4">Product Detail</h1>
      <Table data={dataTable} columns={columns} showFavorites={false} />
    </div>
  );
};

export default ItemDetail;
