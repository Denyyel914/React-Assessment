import { useEffect, useState, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Table from "./Table";

const ItemDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    if (item) {
      setDataTable([item]);
    }
  }, [item]);

  const columns = useMemo(
    () => [
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
    ],
    []
  );

  if (!item) {
    return (
      <div>
        <p>No item data available. Try refreshing the page.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Product Detail</h1>
      <Table data={dataTable} columns={columns} showFavorites={false} />
    </div>
  );
};

export default ItemDetails;
