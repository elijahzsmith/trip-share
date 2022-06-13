import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFollows = createAsyncThunk("follows/fetchFollows", () => {
  return fetch("/follows")
    .then((res) => res.json())
    .then((follows) => {
      // console.log(follows);
      return follows;
    });
});

export const addFollow = createAsyncThunk("follows/addFollow", (followData) => {
  return fetch(`/follows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(followData),
  }) // add if res.ok
    .then((res) => res.json())
    .then((newFollow) => {
      console.log(newFollow);
      return newFollow;
    });
});

export const unfollow = createAsyncThunk("follows/unfollow", (id) => {
  return fetch(`/follows/${id}`, { method: "DELETE" }).then(() => id);
});

const followsSlice = createSlice({
  name: "follows",
  initialState: {
    entities: [],
    status: "idle",
  },
  reducers: {
    followAdded(state, action) {
      state.entities.push(action.payload);
    },
  },
  extraReducers: {
    [fetchFollows.pending](state) {
      state.status = "loading";
    },
    [fetchFollows.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
    [addFollow.pending](state) {
      state.status = "loading";
    },
    [addFollow.fulfilled](state, action) {
      state.entities.push(action.payload);
      state.status = "idle";
    },
    [unfollow.pending](state) {
      state.status = "loading";
    },
    [unfollow.fulfilled](state, action) {
      state.entities.filter((follow) => action.payload !== follow.id);
      state.status = "idle";
    },
  },
});

export const { followAdded } = followsSlice.actions;

export default followsSlice.reducer;
