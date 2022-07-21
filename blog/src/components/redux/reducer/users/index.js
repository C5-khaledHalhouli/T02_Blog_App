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
      localStorage.setItem("users", JSON.stringify(state.users));

    },
    // payload {username,email}

    login(state, action) {
      state.loginUser = state.users.filter((element) => {
        return (
          element.username === action.payload.username &&
          element.email === action.payload.email
        );
      });

      if (action.payload && action.payload.name) {
        state.loginUser = [action.payload];
      }
      localStorage.setItem("login", JSON.stringify(state.loginUser[0]));
    },
    // payload [userId,{username,email,name}]

    editeUserAction(state, action) {
      state.users.forEach((element, index, array) => {
        if (element.id === action.payload[0]) {
          array[index] = { ...array[index], ...action.payload[1] };
        }
      });
      state.loginUser[0] = { ...state.loginUser[0], ...action.payload[1] };
      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem("login", JSON.stringify(state.loginUser[0]));


    },
  },
});
export const { allUsers, login, editeUserAction } = usersSlice.actions;
export default usersSlice.reducer;
