"use client";
import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import { useGetPortfolioByUsernameQuery } from "@/services/portfolioApi";
import UserNotFound from "../_components/404page/UserNotFound";

type TemplateKey = "default" | "minimal" | "steam" | "luminary";

const templates = {
  default: dynamic(() => import("../_components/_templates/default/layout")),
  minimal: dynamic(() => import("../_components/_templates/minimal/layout")),
  steam: dynamic(() => import("../_components/_templates/steam/layout")),
  luminary: dynamic(() => import("../_components/_templates/luminary/layout")),
  // Add other templates here
};

const UserLayout = ({
  params,
  children,
}: {
  params: Promise<{ username: string }>;
  children: ReactNode;
}) => {
  const { username } = React.use(params);
  const { data: userData, isLoading } = useGetPortfolioByUsernameQuery(username);

  if (!userData) return isLoading ? null : <UserNotFound />;

  const templateKey: TemplateKey =
    (userData.template as TemplateKey) || "default";

  // Get the layout component (guaranteed to exist due to our typing)
  const SelectedLayout = templates[templateKey];

  return <SelectedLayout userData={userData}>{children}</SelectedLayout>;
};
export default UserLayout;
