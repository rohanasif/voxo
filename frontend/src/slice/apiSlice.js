import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["currentUser", "users"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1/auth" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/signup",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    signUp: builder.mutation({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    signIn: builder.mutation({
      query: (user) => ({
        url: "/signin",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users", "currentUser"],
    }),
    signOut: builder.mutation({
      query: (token) => ({
        url: "/signout",
        method: "POST",
        body: { token },
      }),
      invalidatesTags: ["users", "currentUser"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
} = authApi;
