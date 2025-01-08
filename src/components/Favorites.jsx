import { useFavorites } from "../context/FavoriteContext";

const Favorites = () => {
  const { selectedRows } = useFavorites();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Favorite Items</h2>
      {selectedRows.length > 0 ? (
        <ul>
          {selectedRows.map((item) => (
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
