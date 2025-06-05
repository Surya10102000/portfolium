"use client";
import { useGetPortfolioByUsernameQuery } from "@/services/portfolioApi";
import { usePathname } from "next/navigation";
import DefaultTemplate from "../_components/_templates/DefaultTemplate/DefaultTemplate";

const UserPortfolio = () => {
  const username = usePathname().slice(1);
  const {
    data,
    isLoading,
  } = useGetPortfolioByUsernameQuery(username);

  if(!data) return <div>{"no Data"}</div>
  const templates = {
    'default': DefaultTemplate, 
    // Add other templates here
  };

  // const Template = templates[userData.templateId];
  const Template = templates["default"];
  if(isLoading) <p>Loading</p>

  if (!Template) return <div>Template not found</div>;

  return <Template data={data} />;
};
export default UserPortfolio;
