import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [favoriteData, setfavoriteData] = useState([]);

  const toggleFavorite = (row) => {
    setfavoriteData((prevfavoriteData) =>
      prevfavoriteData.some(({ id }) => id === row.id)
        ? prevfavoriteData.filter(({ id }) => id !== row.id)
        : [...prevfavoriteData, row]
    );
  };

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

  const clearFavorites = () => setfavoriteData([]);

  return (
    <FavoriteContext.Provider
      value={{ favoriteData, toggleFavorite, clearFavorites, columns }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
