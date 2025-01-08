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

  const clearFavorites = () => setfavoriteData([]);

  return (
    <FavoriteContext.Provider
      value={{ favoriteData, toggleFavorite, clearFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
