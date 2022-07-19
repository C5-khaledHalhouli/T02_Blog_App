import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loginUser: [],
  },
  reducers: {
    // payload all users on array
    allUsers(state, action) {
      state.users = [...action.payload];
    },
    // payload {username,email}

    login(state, action) {
      console.log(action.payload);
      state.loginUser = state.users.filter((element) => {
      console.log(element.username === action.payload.username,element.email === action.payload.email,action.payload.username,element.username,action.payload.email,element.email);

        return (
          element.username === action.payload.username &&
          element.email === action.payload.email
        );
      });

      localStorage.setItem("login", JSON.stringify(state.loginUser));
    },
    // payload [userId,{username,email,name}]

    editeUserAction(state, action) {
      state.users.forEach((element, index, array) => {
        if (element.id === action.payload[0]) {
          array[index] = { ...array[index], ...action.payload[1] };
        }
      });
      state.loginUser[0] = { ...state.loginUser[0], ...action.payload[1] };
    },
  },
});
export const { allUsers, login, editeUserAction } = usersSlice.actions;
export default usersSlice.reducer;
