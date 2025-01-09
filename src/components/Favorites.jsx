import { useSelector } from "react-redux";
import Table from "./Table";
const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

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
      <h1 className="text-xl mb-4">Favorite Items</h1>
      {favorites.length > 0 ? (
        <Table data={favorites} columns={columns} showFavorites={true} />
      ) : (
        <h2 className="flex items-center justify-center h-screen">
          No favorites selected.
        </h2>
      )}
    </div>
  );
};

export default Favorites;
