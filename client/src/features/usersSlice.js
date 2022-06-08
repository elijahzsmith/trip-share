import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", () => {
  return fetch("/users")
    .then((response) => response.json())
    .then((data) => data);
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending](state) {
      state.status = "loading";
    },
    [fetchUsers.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const usersSliceReducer = usersSlice.reducer;

export function addUser(user) {
  return {
    type: "users/add",
    payload: user,
  };
}

// Reducer
const initialState = {
  users: [],
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "users/add":
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    default:
      return state;
  }
}
