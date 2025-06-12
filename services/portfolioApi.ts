import {
  AboutSection,
  Contact,
  Experience,
  HeroSectionI,
  Project,
  UserData,
} from "@/types/userData";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Portfolio"],
  endpoints: (builder) => ({
    updatePrimaryColor: builder.mutation({
      query: (color) => ({
        url: '/theme/color',
        method: 'PUT',
        body: { color },
      }),
    }),
    getPortfolioByUsername: builder.query<UserData, string>({
      query: (username) => `profile/${username}`,
      providesTags: (result, error, username) => [{ type: 'Portfolio', id: username }],
    }),
    getPortfolio: builder.query<UserData, void>({
      query: () => "profile",
      providesTags: ["Portfolio"],
    }),
    updateContact: builder.mutation<Contact, Contact>({
      query: (formData) => ({
        url: "formhandler/contact",
        method: "POST",
        body: { formData },
      }),
      invalidatesTags: ["Portfolio"],
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
    addProject: builder.mutation<Project, Project>({
      query: (formData) => ({
        url: "formhandler/project",
        method: "POST",
        body: { formData },
      }),
      invalidatesTags: ["Portfolio"],
    }),
     updateProject: builder.mutation<Project,{projectId : string , formData : Project}>({
      query: ({ projectId, formData }) => ({
        url: "formhandler/project",
        method: "PUT",
        body: { projectId, formData },
      }),
      invalidatesTags: ["Portfolio"],
    }),

    deleteProject: builder.mutation<void, string>({
      query: (projectId) => ({
        url: "formhandler/project",
        method: "DELETE",
        body: { projectId },
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
  useDeleteExperienceMutation,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetPortfolioByUsernameQuery,
  useUpdatePrimaryColorMutation,
  useUpdateContactMutation
} = portfolioApi;
