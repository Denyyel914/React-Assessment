import axios from "axios";
import MockData from "../data/Mock_Data.json";
import { useEffect, useState } from "react";
import Table from "../components/Table";

const Home = () => {
  const [data, setData] = useState(MockData);

  useEffect(() => {
    console.log(data, columns);
  }, []);

  const columns = [
    { Header: "ID", accessorKey: "id" },
    { Header: "Title", accessorKey: "title" },
    { Header: "Description", accessorKey: "description" },
    { Header: "Price", accessorKey: "price" },
    { Header: "Image", accessorKey: "image" },
  ];
  return (
    <div>
      <h3 className="text-3xl  mb-4">List of Products</h3>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default Home;
