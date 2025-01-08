import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowClick = (row) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.some(({ id }) => id === row.id)
        ? prevSelectedRows.filter(({ id }) => id !== row.id)
        : [...prevSelectedRows, row]
    );
  };

  const clearFavorites = () => setSelectedRows([]);

  return (
    <FavoriteContext.Provider
      value={{ selectedRows, handleRowClick, clearFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
