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
    },
    // payload postId 

    deletePostsAction(state,action){
      console.log(action.payload);
state.posts=state.posts.filter((element)=>{
  return element.id !== action.payload
})
    },
    // payload array [postId,{newTitle,newBody}]
    editeAction(state,action){
      console.log(action.payload);
      state.posts.forEach((element,index,array)=>{
        if(element.id===action.payload[0]){
          array[index]={...element,...action.payload[1]}
        }
      })
    }
  },
});
export const { allPosts,addPostsAction,deletePostsAction,editeAction } = postsSlice.actions;
export default postsSlice.reducer;
