"use client";
import React, { ReactNode } from "react";
import DefaultLayout from "../_components/_templates/default/layout";
import MinimalLayout from "../_components/_templates/minimal/layout";
import SteamLayout from "../_components/_templates/steam/layout";
import { useGetPortfolioByUsernameQuery } from "@/services/portfolioApi";
import UserNotFound from "../_components/404page/UserNotFound";

type TemplateKey = "default" | "minimal" | "steam";

const UserLayout = ({
  params,
  children,
}: {
  params: Promise<{ username: string }>;
  children: ReactNode;
}) => {
  const { username } = React.use(params);
  const { data: userData, isLoading } = useGetPortfolioByUsernameQuery(username);
  const templates = {
    default: DefaultLayout,
    minimal: MinimalLayout,
    steam: SteamLayout,
    // Add other templates here
  };

  if (!userData) return isLoading ? null : <UserNotFound/>;

  const templateKey: TemplateKey =
    (userData.template as TemplateKey) || "default";

  // Get the layout component (guaranteed to exist due to our typing)
  const SelectedLayout = templates[templateKey];

  return <SelectedLayout userData={userData}>{children}</SelectedLayout>;
};
export default UserLayout;
