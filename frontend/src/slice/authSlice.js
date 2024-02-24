import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      return {
        ...state,
        users: [...state.users, action.payload],
        currentUser: { ...action.payload, isLoggedIn: true },
      };
    },
    signIn: (state, action) => {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...user, isLoggedIn: true } : user
        ),
      };
    },
    signOut: (state, action) => {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...user, isLoggedIn: false } : user
        ),
      };
    },
  },
});

export const { signUp, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
