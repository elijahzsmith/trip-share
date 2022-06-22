import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const setUser = createAsyncThunk("users/setUser", () => {
  return fetch("/authorized_user").then((res) => {
    if (res.ok) {
      return res.json().then((user) => user);
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
      return res.json().then((user) => {
        return user;
      });
    } else {
      return res.json().then((err) => err);
    }
  });
});

export const handleUpdate = createAsyncThunk(
  "users/handleUpdate",
  (formData, history) => {
    return fetch(`/users/${formData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        console.log("update response: ", res);
        history.push("/profile");
        return res.json().then((user) => {
          console.log(user);
          return user;
        });
      } else {
        return res.json().then((err) => err);
      }
    });
  }
);

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
      return res.json().then((user) => {
        return user;
      });
    } else {
      return res.json((error) => error);
    }
  });
});

export const createLogout = createAsyncThunk(
  "users/createLogout",
  (history) => {
    return fetch("/logout", { method: "DELETE" }).then((res) => {
      if (res.ok) {
        history.push("/login");
        return [];
      }
    });
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    status: "idle",
    authorized: false,
    errors: [],
  },
  reducers: {},
  extraReducers: {
    [fetchLogin.pending](state) {
      state.status = "loading";
    },
    [fetchLogin.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
      if (action.payload.error) {
        state.authorized = false;
        state.errors.push(action.payload);
      } else {
        state.authorized = true;
      }
    },
    [createSignup.pending](state) {
      state.status = "loading";
    },
    [createSignup.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
      if (action.payload.errors) {
        state.authorized = false;
        state.errors = action.payload;
      } else {
        state.authorized = true;
      }
    },
    [createLogout.pending](state) {
      state.status = "loading";
    },
    [createLogout.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
      state.authorized = false;
      state.errors = [];
    },
    [handleUpdate.pending](state) {
      state.status = "loading";
    },
    [handleUpdate.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
    [setUser.pending](state) {
      state.status = "loading";
    },
    [setUser.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
      if (action.payload) {
        state.authorized = true;
      } else {
        state.authorized = false;
      }
    },
  },
});

export const { handleSignup, handleLogin, handleAuth } = usersSlice.actions;

export default usersSlice.reducer;
