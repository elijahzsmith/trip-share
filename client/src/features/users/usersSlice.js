import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const setUser = createAsyncThunk("users/setUser", () => {
  return fetch("/authorized_user").then((res) => {
    if (res.ok) {
      return res.json().then((user) => user);
    }
  });
});

export const createSignup = createAsyncThunk(
  "users/createSignup",
  (user, history, setError) => {
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
        return res.json().then((user) => {
          history.push("/");
          return user;
        });
      } else {
        return res.json().then((err) => {
          // console.log(err);
          setError(err);
        });
      }
    });
  }
);

export const handleUpdate = createAsyncThunk(
  "users/handleUpdate",
  (formData) => {
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
        return res.json().then((user) => {
          console.log(user);
          return user;
        });
      } else {
        return res.json().then((err) => console.log(err));
      }
    });
  }
);

export const fetchLogin = createAsyncThunk(
  "users/fetchLogin",
  (user, history, setError) => {
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
        return res.json((error) => setError(error));
      }
    });
  }
);

export const createLogout = createAsyncThunk(
  "users/createLogout",
  (history) => {
    console.log(history);
    return fetch("/logout", { method: "DELETE" }).then((res) => {
      if (res.ok) {
        history.push("/login");
        return [];
      }
      //   // history.push("/login");
    });
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    status: "idle",
    authorized: false,
  },
  reducers: {},
  extraReducers: {
    [fetchLogin.pending](state) {
      state.status = "loading";
    },
    [fetchLogin.fulfilled](state, action) {
      state.entities = action.payload;
      console.log(action.payload);
      state.status = "idle";
      // state.authorized = true;
      if (action.payload.error) {
        state.authorized = false;
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
      // state.authorized = true;
      if (action.payload.error) {
        state.authorized = false;
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
    },
    [handleUpdate.pending](state) {
      state.status = "loading";
    },
    [handleUpdate.fulfilled](state, action) {
      console.log(action.payload);
      state.entities = action.payload;
      state.status = "idle";
    },
    [setUser.pending](state) {
      state.status = "loading";
    },
    [setUser.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
      console.log(action.payload);
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

// handleSignup(state, action) {
//   state.entities = action.payload;
// },
// handleLogin(state, action) {
//   state.entities.push(action.payload);
// },
// handleAuth(state, action) {
//   state.entities = action.payload;
// },
// handleLogout(state, action) {
//   state.entities = action.payload;
// },
