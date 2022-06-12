import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllOtherUsers = createAsyncThunk(
  "users/fetchAllOtherUsers",
  () => {
    return fetch("/users")
      .then((res) => res.json())
      .then((users) => users);
  }
);

export const fetchOneOtherUser = createAsyncThunk(
  "users/fetchOneOtherUser",
  (id) => {
    return fetch(`/users/${id}`)
      .then((res) => res.json())
      .then((user) => {
        console.log("fetchOneUser: ", user);
        return user;
      });
  }
);

const otherUsersSlice = createSlice({
  name: "otherUsers",
  initialState: {
    entities: [],
    trips: [],
    status: "idle",
    authorized: false,
  },
  reducers: {
    addUsers(state, action) {
      state.entities.push(action.payload);
      state.trips.push(action.payload.trips);
    },
  },
  extraReducers: {
    [fetchAllOtherUsers.pending](state) {
      state.status = "loading";
    },
    [fetchAllOtherUsers.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
    [fetchOneOtherUser.pending](state) {
      state.status = "loading";
    },
    [fetchOneOtherUser.fulfilled](state, action) {
      state.entities = action.payload;
      state.trips = action.payload.trips;
      state.authorized = true;
      state.status = "idle";
    },
  },
});

export const { addUsers } = otherUsersSlice.actions;

export default otherUsersSlice.reducer;
