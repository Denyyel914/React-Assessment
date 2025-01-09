import { useFavorites } from "../context/FavoriteContext";
import Table from "./Table";
const Favorites = () => {
  const { favoriteData, columns } = useFavorites();

  return (
    <div>
      <h1 className="text-2xl mb-4">Favorite Items</h1>
      {favoriteData.length > 0 ? (
        <Table data={favoriteData} columns={columns} showFavorites={true} />
      ) : (
        <p>No favorites selected.</p>
      )}
    </div>
  );
};

export default Favorites;
