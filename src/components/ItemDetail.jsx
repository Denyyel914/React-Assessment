import { useEffect, useState, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";
import Table from "./Table";

const ItemDetails = () => {
  const { columns } = useFavorites();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    if (item) {
      setDataTable([item]);
    }
  }, [item]);

  if (!item) {
    return (
      <div>
        <p>No item data available. Try refreshing the page.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Product Detail</h1>
      <Table data={dataTable} columns={columns} showFavorites={false} />
    </div>
  );
};

export default ItemDetails;
