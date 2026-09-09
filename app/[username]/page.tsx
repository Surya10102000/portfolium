"use client";
import { useGetPortfolioByUsernameQuery } from "@/services/portfolioApi";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

type TemplateKey = 'default' | 'minimal' | 'steam' | 'luminary';

const templates = {
  default: dynamic(() => import("../_components/_templates/default/DefaultHome")),
  minimal: dynamic(() => import("../_components/_templates/minimal/MinimalHome")),
  steam: dynamic(() => import("../_components/_templates/steam/SteamHome")),
  luminary: dynamic(() => import("../_components/_templates/luminary/LuminaryHome")),
  // Add other templates here
};

const UserPortfolio = () => {
  const username = usePathname().slice(1);
  const { data, isLoading } = useGetPortfolioByUsernameQuery(username);


  if (!data) return <div></div>;

  const templateKey: TemplateKey =
    (data.template as TemplateKey) || "default";

  const Template = templates[templateKey];
  if (isLoading) <p>Loading</p>;

  if (!Template) return <div>Template not found</div>;

  return <Template data={data} />;
};
export default UserPortfolio;
