import { useParams } from "react-router-dom";
import { useMemo } from "react";
import data from "../data/Mock_Data.json";

const RowDetails = () => {
  const { id } = useParams();
  const item = useMemo(
    () => data.find((item) => item.id === parseInt(id)),
    [id]
  );

  if (!item) {
    return <h2>Item not found</h2>;
  }

  return (
    <div>
      <h1 className=" text-2xl mb-4">Product Detail</h1>
      <h2>{item.title}</h2>
      <p>{id.title}</p>
      <p>{item.description}</p>
      <p>Price: {item.price}</p>
      {/* <img src={item.image} alt={item.title} /> */}
    </div>
  );
};

export default RowDetails;
