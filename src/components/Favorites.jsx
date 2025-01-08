import { useFavorites } from "../context/FavoriteContext";

const Favorites = () => {
  const { favoriteData } = useFavorites();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Favorite Items</h2>
      {favoriteData.length > 0 ? (
        <ul>
          {favoriteData.map((item) => (
            <li key={item.id} className="mb-2 border-b p-2">
              <strong>{item.title}</strong> - {item.description} - ${item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites selected.</p>
      )}
    </div>
  );
};

export default Favorites;
