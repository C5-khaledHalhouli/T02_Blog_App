import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts:[]
  },
  reducers: {
    // payload all posts on array
    allPosts(state,action){
state.posts=[...action]
    }
  },
});
export const {allPosts}=postsSlice.actions
export default postsSlice.reducer