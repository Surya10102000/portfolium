import { PortfolioViewer } from "@/app/_components/PortfolioViewer";// import { getPortfolioByUsername } from '@/lib/api/portfolio';
import userData from "@/data/userData";

interface PortfolioPageProps {
  params: { username: string };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  // For now using mock data, later replace with:
  // const portfolioData = await getPortfolioByUsername(params.username);
  const portfolioData = userData;
  
  return (
    <PortfolioViewer 
      data={portfolioData} 
    />
  );
}