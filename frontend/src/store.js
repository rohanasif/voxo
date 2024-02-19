import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authApi } from "./slice/apiSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
});

setupListeners(store.dispatch);

export default store;
