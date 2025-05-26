import { updateAbout } from "@/redux/portfolioSlice";
import { AboutSection, HeroSectionI, UserData } from "@/types/userData";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Portfolio"],
  endpoints: (builder) => ({
    getPortfolio: builder.query<UserData, void>({
      query: () => "profile",
      providesTags: ["Portfolio"],
    }),
    updateHero: builder.mutation<HeroSectionI, HeroSectionI>({
      query: (formData) => ({
        url: "formhandler/hero",
        method: "POST",
        body: { formData },
      }),
      invalidatesTags: ["Portfolio"],
    }),
    updateAbout: builder.mutation<AboutSection, AboutSection>({
      query: (formData) => ({
        url: "formhandler/about",
        method: "POST",
        body: { formData },
      }),
      invalidatesTags: ["Portfolio"],
    }),
  }),
});

export const { useGetPortfolioQuery, useUpdateHeroMutation,useUpdateAboutMutation } = portfolioApi;
