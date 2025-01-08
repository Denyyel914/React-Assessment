import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import { useDispatch } from "react-redux";
import { clearFavorites } from "../store/favoriteSlice";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const cachedData = localStorage.getItem("products");
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false); // Stop loading if data is cached
      } else {
        try {
          setLoading(true); // Start loading
          const res = await axios.get(
            "https://fakestoreapi.com/products?limit=5"
          );
          setData(res.data);
          localStorage.setItem("products", JSON.stringify(res.data)); // Cache the data
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // Stop loading
        }
      }
    };

    getData();
  }, []);

  const columns = [
    { Header: "ID", accessorKey: "id" },
    { Header: "Title", accessorKey: "title" },
    { Header: "Description", accessorKey: "description" },
    { Header: "Price", accessorKey: "price" },
    { Header: "Image", accessorKey: "image" },
  ];

  const handleClear = () => {
    dispatch(clearFavorites());
    localStorage.removeItem("products"); // Optionally clear cached data when clearing favorites
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-3xl mb-4">List of Products</h3>
        <button
          className="bg-[#0077D4] text-sm px-2 py-2 cursor-pointer rounded-md text-white hover:opacity-90 focus:outline-none"
          onClick={handleClear}
        >
          Clear favorites
        </button>
      </div>

      <Table data={data} columns={columns} loading={loading} />
    </div>
  );
};

export default Home;
