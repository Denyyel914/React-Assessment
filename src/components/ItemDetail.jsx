import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Table from "./Table";

const ItemDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const item = location.state;

  const [dataTable, setDataTable] = useState([]);

  if (!item) return <p>No item data available. Try refreshing the page.</p>;

  const columns = [
    { Header: "ID", accessorKey: "id" },
    { Header: "Title", accessorKey: "title" },
    { Header: "Description", accessorKey: "description" },
    {
      Header: "Price",
      accessorKey: "price",
      cell: ({ row }) => <span>${row.original.price.toFixed(2)}</span>,
    },
    {
      Header: "Image",
      accessorKey: "image",
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.title}
          className="w-16 h-16 object-contain"
        />
      ),
    },
  ];

  useEffect(() => {
    if (location && location.state) {
      setDataTable([location.state]);
    }
  }, [location]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Product Detail</h1>
      <Table data={dataTable} columns={columns} showFavorites={false} />
    </div>
  );
};

export default ItemDetails;
