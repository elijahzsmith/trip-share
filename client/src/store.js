import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./features/users/usersSlice";
import tripsReducer from "./features/trips/tripsSlice";
import favoritesReducer from "./features/favorites/favoritesSlice";
import followsReducer from "./features/follows/followsSlice";
import otherUsersReducer from "./features/users/otherUsersSlice";

const store = configureStore({
  reducer: {
    //change to userReducer
    users: usersReducer,
    trips: tripsReducer,
    favorites: favoritesReducer,
    otherUsers: otherUsersReducer,
    follows: followsReducer,
  },
});

export default store;
