import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments:[]
  },
  reducers: {
    // payload all comments on array
    allComments(state,action){
state.comments=[...action]
    }
  },
});
export const {allComments}=commentsSlice.actions
export default commentsSlice.reducer
