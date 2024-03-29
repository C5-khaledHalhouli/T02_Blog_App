import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    showPost: [],
    numPage: 1,
    postsOfSearch: [],
  },
  reducers: {
    // payload all posts on array
    allPosts(state, action) {
      state.posts = [...action.payload];
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    // payload object {userId,Id,title,body}
    addPostsAction(state, action) {
      state.posts = [action.payload, ...state.posts];
      state.showPost = state.posts.slice(0, state.numPage * 10);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    // number counten how many page is open
    showPostsAction(state, action) {
      state.numPage = action.payload;

      if (state.numPage === 1) {
        state.postsOfSearch = [];
      }
      if (state.numPage !== 1 && state.postsOfSearch.length >= 1) {
        state.showPost = state.postsOfSearch.slice(0, state.numPage * 10);
        state.numPage += 1;
      } else {
        state.showPost = state.posts.slice(0, state.numPage * 10);
        state.numPage += 1;
      }
    },
    // payload postId

    deletePostsAction(state, action) {
      state.posts = state.posts.filter((element) => {
        return element.id !== action.payload;
      });
      state.showPost = state.posts.slice(0, state.numPage * 5);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    // payload array [postId,{newTitle,newBody}]
    editeAction(state, action) {
      state.posts.forEach((element, index, array) => {
        if (element.id === action.payload[0]) {
          array[index] = { ...element, ...action.payload[1] };
        }
      });
      state.showPost = state.posts.slice(0, state.numPage * 5);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    // payload id of writter search
    searchAction(state, action) {
      state.postsOfSearch = [];
      for (let i = 0; i < action.payload.length; i++) {
        const arrayOfSearch = state.posts.filter((element) => {
          return element.userId === action.payload[i].id;
        });
        state.postsOfSearch.push(...arrayOfSearch);
      }
      if (state.postsOfSearch.length) {
        state.showPost = state.postsOfSearch;
        state.showPost = state.showPost.slice(0, 10);
        state.numPage = 2;
      }
    },
  },
});
export const {
  allPosts,
  addPostsAction,
  deletePostsAction,
  editeAction,
  showPostsAction,
  searchAction,
} = postsSlice.actions;
export default postsSlice.reducer;
