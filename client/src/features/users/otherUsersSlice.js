import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchOtherUsers = createAsyncThunk("users/fetchUsers", () => {
  return fetch("/users")
    .then((res) => res.json())
    .then((users) => users);
});

const otherUsersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    status: "idle",
    authorized: false,
  },
  reducers: {
    addUsers(state, action) {
      state.entities.push(action.payload);
    },
  },
  extraReducers: {
    [fetchOtherUsers.pending](state) {
      state.status = "loading";
    },
    [fetchOtherUsers.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { addUsers } = otherUsersSlice.actions;

export default otherUsersSlice.reducer;
