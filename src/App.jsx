import Home from "./components/Home";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Favorites from "./components/Favorites";
import ItemDetail from "./components/ItemDetail";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  return (
    <div>
      <Header />
      <main className="p-4 md:p-8 lg:p-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/item/:id" element={<ItemDetail />} />{" "}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
