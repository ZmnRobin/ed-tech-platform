import { apiSlice } from "../apiSlice";
import { userLoggedIn } from "../user/auth/authSlice";

export const adminAuthSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminlogin: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (err) {
                    // do nothing
                }
            },
        }),
    })
})

export const {useAdminloginMutation} = adminAuthSlice;