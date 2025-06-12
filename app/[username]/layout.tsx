"use client";
import React, { ReactNode } from "react";
import DefaultLayout from "../_components/_templates/default/layout";
import MinimalLayout from "../_components/_templates/minimal/layout";
import { useGetPortfolioByUsernameQuery } from "@/services/portfolioApi";
import { mockUserData } from "@/public/mockData";

type TemplateKey = 'default' | 'minimal'; 

const UserLayout = ({
  params,
  children,
}: {
  params: Promise<{ username: string }>;
  children: ReactNode;
}) => {
  const { username } = React.use(params);
  const { data: userData } = useGetPortfolioByUsernameQuery(username);
  const templates = {
    default: DefaultLayout,
    minimal: MinimalLayout,
    // Add other templates here
  };

  if (!userData) return null;

  const templateKey: TemplateKey =
    (userData.template as TemplateKey) || "default";

  // Get the layout component (guaranteed to exist due to our typing)
  const SelectedLayout = templates[templateKey];

  return <SelectedLayout userData={userData}>{children}</SelectedLayout>;
};
export default UserLayout;
