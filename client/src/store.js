import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./features/users/usersSlice";
import tripsReducer from "./features/trips/tripsSlice";
// import favoritesReducer from "./features/favorites/favoritesSlice";
import followsReducer from "./features/follows/followsSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    trips: tripsReducer,
    // favorites: favoritesReducer,
    follows: followsReducer,
  },
});

export default store;
