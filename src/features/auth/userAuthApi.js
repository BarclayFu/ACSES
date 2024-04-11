import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./userAuthSlice";

export const userAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "userAuth",
            JSON.stringify({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );
        } catch (err) {}
      },
    }),
    userLoggedIn: builder.query({
      query: () => ({
        url: "https://vivid-bloom-0edc0dd8df.strapiapp.com/api/users/me",
        headers: {
          Authorization: `Bearer ${
            localStorage.jwt
          }`,
        },
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserLoggedInQuery,
} = userAuthApi;
