import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users:[],
    loginUser:[]
  },
  reducers: {
    // payload all users on array
    allUsers(state,action){
state.users=[...action.payload]
    },
    // payload {username,email}

    login(state,action){
        console.log(action.payload);
state.loginUser=state.users.filter((element)=>{
    return element.username===action.payload.username && element.email===action.payload.email
})
console.log(state.loginUser);
    }
  },
});
export const {allUsers,login}=usersSlice.actions
export default usersSlice.reducer