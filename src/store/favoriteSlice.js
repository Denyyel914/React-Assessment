import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const existingIndex = state.favorites.findIndex(
        (row) => row.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1); // Remove if already exists
      } else {
        state.favorites.push(action.payload); // Add if not exists
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
