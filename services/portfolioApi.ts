import {
  AboutSection,
  Experience,
  HeroSectionI,
  UserData,
} from "@/types/userData";
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
    addExperience: builder.mutation<Experience, Experience>({
      query: (formData) => ({
        url: "formhandler/experience",
        method: "POST",
        body: { formData },
      }),
      invalidatesTags: ["Portfolio"],
    }),
    updateExperience: builder.mutation<Experience,{experienceId : string , formData : Experience}>({
      query: ({ experienceId, formData }) => ({
        url: "formhandler/experience",
        method: "PUT",
        body: { experienceId, formData },
      }),
      invalidatesTags: ["Portfolio"],
    }),

    deleteExperience: builder.mutation<void, string>({
      query: (experienceId) => ({
        url: "formhandler/experience",
        method: "DELETE",
        body: { experienceId },
      }),
      invalidatesTags: ["Portfolio"],
    }),
  }),
});

export const {
  useGetPortfolioQuery,
  useUpdateHeroMutation,
  useUpdateAboutMutation,
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation
} = portfolioApi;
