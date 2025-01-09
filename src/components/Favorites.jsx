import { useFavorites } from "../context/FavoriteContext";
import Table from "./Table";
const Favorites = () => {
  const { favoriteData } = useFavorites();
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

  return (
    <div>
      <h1 className="text-2xl mb-4">Favorite Items</h1>
      {favoriteData.length > 0 ? (
        <Table data={favoriteData} columns={columns} showFavorites={false} />
      ) : (
        <p>No favorites selected.</p>
      )}
    </div>
  );
};

export default Favorites;
