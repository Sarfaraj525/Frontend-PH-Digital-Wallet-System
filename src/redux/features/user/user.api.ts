import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch current logged-in user
    getUser: builder.query<{ name: string; phone: string; email: string }, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // Update user profile
    updateProfile: builder.mutation<
      { success: boolean; message: string },
      { name?: string; phone?: string; password?: string }
    >({
      query: (body) => ({
        url: "/user/me",
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["USER"], // refresh the getUser query after update
    }),
  }),
});

export const { useGetUserQuery, useUpdateProfileMutation } = userApi;
