import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    // payload all posts on array
    allPosts(state, action) {
      state.posts = [...action.payload];
    },
    // payload object {userId,Id,title,body}
    addPostsAction(state,action){
      
      state.posts=[action.payload,...state.posts]
    }
  },
});
export const { allPosts,addPostsAction } = postsSlice.actions;
export default postsSlice.reducer;
