import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoriteSlice";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;
