import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./reducer/comments/index";
import postsReducer from "./reducer/posts/index";
import usersReducer from "./reducer/users/index";

export default  configureStore({
    reducer:{
        comments:commentsReducer,
        users:usersReducer,
        posts:postsReducer

    }
})