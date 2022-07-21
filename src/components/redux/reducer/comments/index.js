import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    commentsOfPost: [],
  },
  reducers: {
    // payload all comments on array
    allComments(state, action) {
      state.comments = [...action.payload];
    },
    // payload all comments of post on array

    commentsOfPost(state, action) {
      state.commentsOfPost = [...action.payload];
    },
  },
});
export const { allComments, commentsOfPost } = commentsSlice.actions;
export default commentsSlice.reducer;
