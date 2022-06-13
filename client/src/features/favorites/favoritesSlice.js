import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  () => {
    return fetch("/favorites")
      .then((res) => res.json())
      .then((favorites) => {
        return favorites;
      });
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  (favoriteData) => {
    return fetch(`/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(favoriteData),
    }) // add if res.ok
      .then((res) => res.json())
      .then((newFavorite) => {
        console.log(newFavorite);
        return newFavorite;
      });
  }
);

export const unfavorite = createAsyncThunk("favorites/unfavorite", (id) => {
  return fetch(`/favorites/${id}`, { method: "DELETE" }).then(() => {
    return id;
  });
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
    favoriteAdded(state, action) {
      state.entities = state.entities.filter(
        (fav) => fav.id !== action.payload.id
      );
    },
  },
  extraReducers: {
    [fetchFavorites.pending](state) {
      state.status = "loading";
    },
    [fetchFavorites.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
    [unfavorite.pending](state) {
      state.status = "loading";
    },
    [unfavorite.fulfilled](state, action) {
      console.log("fullfilled: ", action.payload);
      state.entities = state.entities.filter(
        (favorite) => action.payload !== favorite.id
      );
      state.status = "idle";
    },
    [addFavorite.pending](state) {
      state.status = "loading";
    },
    [addFavorite.fulfilled](state, action) {
      state.entities.push(action.payload);
      console.log("fulfilled: ", action.payload);
      state.status = "idle";
    },
  },
});

export const { favoriteRemoved, favoriteAdded } = favoritesSlice.actions;

export default favoritesSlice.reducer;
