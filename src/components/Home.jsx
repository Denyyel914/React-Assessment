import MockData from "../data/Mock_Data.json";
import Table from "../components/Table";

import { useDispatch } from "react-redux";

import { clearFavorites } from "../store/favoriteSlice";

const Home = () => {
  const dispatch = useDispatch();

  const columns = [
    { Header: "ID", accessorKey: "id" },
    { Header: "Title", accessorKey: "title" },
    { Header: "Description", accessorKey: "description" },
    { Header: "Price", accessorKey: "price" },
    {
      Header: "Image",
      accessorKey: "image",
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.title}
          className="h-12 w-12 object-cover rounded"
        />
      ),
    },
  ];

  const handleClear = () => dispatch(clearFavorites());
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-3xl  mb-4">List of Products</h3>
        <button
          className="bg-[#0077D4] text-sm px-2 py-2 cursor-pointer rounded-md text-white hover:opacity-90 focus:outline-none"
          onClick={handleClear}
        >
          Clear favorites
        </button>
      </div>
      <Table data={MockData} columns={columns} showFavorites={true} />
    </div>
  );
};

export default Home;
