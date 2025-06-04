import { UsernameResponse } from '@/app/api/users/username/route';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes : ["username"],
  endpoints: (builder) => ({
    updateUsername: builder.mutation({
      query: ({ username }) => ({
        url: `users/username`,
        method: 'PUT',
        body: { username: username },
      }),
      invalidatesTags : ["username"]
    }),
    getUsername : builder.query<UsernameResponse , void>({
        query: ()=> "users/username",
        providesTags : ["username"]
    })
  }),
});

export const { useUpdateUsernameMutation,
    useGetUsernameQuery
 } = userApi;