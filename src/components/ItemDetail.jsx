import { useParams, useLocation } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const item = location.state;

  if (!item) return <p>No item data available. Try refreshing the page.</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4">Product Detail</h1>
      <h2 className="text-xl font-bold">{item.title}</h2>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      <img src={item.image} alt={item.title} className="w-64 h-64 mt-4" />
    </div>
  );
};

export default ItemDetails;
