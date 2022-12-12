import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk("comments/fetchComments", () => {
  return fetch("/comments")
    .then((res) => res.json())
    .then((comments) => {
      return comments;
    });
});

export const fetchOneComment = createAsyncThunk(
  "comments/fetchOneComment",
  (id) => {
    return fetch(`/comments/${id}`)
      .then((res) => res.json())
      .then((comment) => {
        return comment;
      });
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  (commentData) => {
    return fetch(`/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(commentData),
    }) // add if res.ok
      .then((res) => res.json())
      .then((newComment) => {
        // console.log(newComment);
        return newComment;
      });
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  (id) => {
    return fetch(`/comments/${id}`, { method: "DELETE" }).then(() => {
      console.log(id);
      return id;
    });
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: [],
    status: "idle",
  },
  reducers: {
    // favoriteRemoved(state, action) {
    //   state.entities = state.entities.filter(
    //     (fav) => fav.id !== action.payload.id
    //   );
    // },
    // favoriteAdded(state, action) {
    //   state.entities = state.entities.filter(
    //     (fav) => fav.id !== action.payload.id
    //   );
    // },
  },
  extraReducers: {
    [removeComment.pending](state) {
      state.status = "loading";
    },
    [removeComment.fulfilled](state, action) {
      // state.entities = [];
      state.entities = state.entities.filter(
        (comment) => action.payload !== comment.id
      );
      console.log("fulfilled");
      state.status = "idle";
    },
    [addComment.pending](state) {
      state.status = "loading";
    },
    [addComment.fulfilled](state, action) {
      state.entities.push(action.payload);
      console.log("addComment fulfilled: ", action.payload);
      state.status = "idle";
    },
    //////////////
    [fetchComments.pending](state) {
      state.status = "loading";
    },
    [fetchComments.fulfilled](state, action) {
      // state.entities = [];
      state.entities = action.payload;
      //
      // state.entities.push(action.payload);
      //   console.log("fulfilled: ", action.payload);
      state.status = "idle";
    },
    [fetchOneComment.pending](state) {
      state.status = "loading";
    },
    [fetchOneComment.fulfilled](state, action) {
      state.entities = action.payload;
      // state.entities = state.entities.push(action.payload);
      //   console.log("fulfilled: ", action.payload);
      state.status = "idle";
    },
  },
});

// export const { favoriteRemoved, favoriteAdded } = commentsSlice.actions;

export default commentsSlice.reducer;
