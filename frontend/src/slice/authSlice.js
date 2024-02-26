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
        currentUser: {
          ...action.payload,
          isLoggedIn: true,
        },
      };
    },
    signOut: (state, action) => {
      return {
        ...state,
        currentUser: null,
      };
    },
  },
});

export const { signUp, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
