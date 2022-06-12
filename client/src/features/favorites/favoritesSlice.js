import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const unfavorite = createAsyncThunk("favorites/unfavorite", (id) => {
  return fetch(`/favorites/${id}`, { method: "DELETE" });
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    entities: [],
    status: "idle",
  },
  reducers: {
    favoriteRemoved(state, action) {
      state.entities = state.entities.filter(
        (fav) => fav.id !== action.payload.id
      );
    },
  },
  extraReducers: {
    [unfavorite.pending](state) {
      state.status = "loading";
    },
    [unfavorite.fulfilled](state) {
      state.entities = [];
      state.status = "idle";
    },
  },
});

export const { favoriteRemoved } = favoritesSlice.actions;

export default favoritesSlice.reducer;
