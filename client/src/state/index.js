import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  error: null,
  comments: [],
  alert: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        } else {
          return post;
        }
      });
      state.posts = updatedPosts;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload.posts);
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    },
    setComments: (state, action) => {
      state.comments = action.payload.comments;
      state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          post.numOfComments += 1;
        }
      });
    },
    deleteComment: (state, action) => {
      const filteredArray = state.comments.filter(comment => comment._id !== action.payload.commentId);
      console.log(filteredArray);
      state.comments = filteredArray;
      state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          post.numOfComments -= 1;
        }
      });
    },
    setAlert: (state, action) => {
      state.alert = action.payload.alert;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  addPost,
  setError,
  setComments,
  deleteComment,
  setAlert,
} = authSlice.actions;
export default authSlice.reducer;
