import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import { useFavorites } from "../context/FavoriteContext";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const { clearFavorites } = useFavorites();
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

  const handleClear = () => {
    clearFavorites();
    localStorage.removeItem("products");
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

      <Table
        data={data}
        columns={columns}
        loading={loading}
        showFavorites={true}
      />
    </div>
  );
};

export default Home;
