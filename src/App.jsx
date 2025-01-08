import Home from "./components/Home";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Favorites from "./components/Favorites";
import ItemDetail from "./components/ItemDetail";
import { Route, Routes } from "react-router-dom";
import { FavoriteProvider } from "./context/FavoriteContext";

const App = () => {
  return (
    <FavoriteProvider>
      <div>
        <Header />
        <main className="p-4 md:p-8 lg:p-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/row/:id" element={<ItemDetail />} />{" "}
            {/* Dynamic route */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </FavoriteProvider>
  );
};

export default App;
