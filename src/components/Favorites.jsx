import { useSelector } from "react-redux";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Favorite Items</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((item) => (
            <li key={item.id} className="mb-2 border-b p-2">
              <strong>{item.title}</strong> - {item.description} - {item.price}
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
