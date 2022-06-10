import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const setUser = createAsyncThunk("users/handleLogin", () => {
  return fetch("/authorized_user").then((res) => {
    if (res.ok) {
      console.log("hi");
      res.json().then((user) => user);
    } else {
      res.json().then((err) => console.log(err));
    }
  });
});

export const createSignup = createAsyncThunk("users/createSignup", (user) => {
  return fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    if (res.ok) {
      console.log("signup response: ", res);
      res.json().then((user) => user);
    } else {
      res.json().then((err) => console.log(err));
    }
  });
});

export const fetchLogin = createAsyncThunk("users/fetchLogin", (user) => {
  return fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    if (res.ok) {
      res.json().then((user) => {
        console.log("user from login response: ", user);
        return user;
      });
    } else {
      res.json().then((err) => console.log(err));
    }
  });
});

export const createLogout = createAsyncThunk("users/handleLogout", (user) => {
  return fetch("/logout", { method: "DELETE" }).then((r) => {
    if (r.ok) {
      console.log("logout response: ", r);
      return r;
    } else {
      r.json().then((err) => console.log(err));
    }
  });
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: {},
    status: "idle",
  },
  reducers: {
    handleSignup(state, action) {
      state.entities = action.payload;
    },
    handleLogin(state, action) {
      console.log(action.payload);
      state.entities ||= action.payload;
      console.log(state.entities);
    },
    handleAuth(state, action) {
      state.entities = action.payload;
    },
    handleLogout(state, action) {
      state.entities = action.payload;
    },
  },
  extraReducers: {
    [fetchLogin.pending](state) {
      state.status = "loading";
    },
    [fetchLogin.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
    [createSignup.pending](state) {
      state.status = "loading";
    },
    [createSignup.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
    [createLogout.pending](state) {
      state.status = "loading";
    },
    [createLogout.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
    [setUser.pending](state) {
      state.status = "loading";
    },
    [setUser.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { handleSignup, handleLogin, handleLogout, handleAuth } =
  usersSlice.actions;

export default usersSlice.reducer;
