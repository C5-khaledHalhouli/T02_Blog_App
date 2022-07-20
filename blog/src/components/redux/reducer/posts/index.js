import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    showPost:[],
    numPage:1
    
  },
  reducers: {
    // payload all posts on array
    allPosts(state, action) {
      state.posts = [...action.payload];
    },
    // payload object {userId,Id,title,body}
    addPostsAction(state,action){
      
      state.posts=[action.payload,...state.posts]
      state.showPost=state.posts.slice(0,(state.numPage*20))
    },
    // number counten how many page is open
    showPostsAction(state,action){
      state.numPage=action.payload
state.showPost=state.posts.slice(0,(state.numPage*20))
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
    },
    // payload id of writter search
    searchAction(state,action){
      const arrayOfSearch=state.posts.filter((element)=>{
        return element.userId =action.payload
      })
      console.log(arrayOfSearch);
      if(arrayOfSearch.length){
        state.posts=arrayOfSearch
      }
    }
  },
});
export const { allPosts,addPostsAction,deletePostsAction,editeAction,showPostsAction,searchAction } = postsSlice.actions;
export default postsSlice.reducer;
