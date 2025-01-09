import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import { useFavorites } from "../context/FavoriteContext";
import { showToast } from "./Toastify";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { clearFavorites, favoriteData, columns } = useFavorites();

  useEffect(() => {
    const getData = async () => {
      const cachedData = localStorage.getItem("products");
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          setLoading(true); // Start loading
          const res = await axios.get(
            "https://fakestoreapi.com/products?limit=5"
          );

          if (res.status === 200) {
            setData(res.data);
            localStorage.setItem("products", JSON.stringify(res.data));
            showToast("Data fetched successfully", "success");
          } else {
            throw new Error(`Unexpected status code: ${res.status}`);
          }
        } catch (error) {
          console.error(error);
          if (error.response) {
            const status = error.response.status;
            if (status === 404) {
              showToast("Data not found (404)", "warning");
            } else if (status === 500) {
              showToast("Server error (500)", "error");
            } else {
              showToast(`Error: ${error.message}`, "error");
            }
          } else {
            showToast("Network error. Please try again.", "error");
          }
        } finally {
          setLoading(false);
        }
      }
    };

    getData();
  }, []);

  // const columns = [
  //   { Header: "ID", accessorKey: "id" },
  //   { Header: "Title", accessorKey: "title" },
  //   { Header: "Description", accessorKey: "description" },
  //   {
  //     Header: "Price",
  //     accessorKey: "price",
  //     cell: ({ row }) => <span>${row.original.price.toFixed(2)}</span>,
  //   },
  //   {
  //     Header: "Image",
  //     accessorKey: "image",
  //     cell: ({ row }) => (
  //       <img
  //         src={row.original.image}
  //         alt={row.original.title}
  //         className="w-16 h-16 object-contain"
  //       />
  //     ),
  //   },
  // ];

  const handleClear = () => {
    if (favoriteData) {
      clearFavorites();
      localStorage.removeItem("products");
      showToast("Favorites cleared", "info");
    } else {
      showToast("There are no favorites at the moment.", "info");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-3 md:mt-5 lg:mt-8">
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
