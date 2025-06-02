import { useGetPortfolioByUsernameQuery } from "@/services/portfolioApi";


interface PortfolioViewProps {
  username: string;
}

const PortfolioView = ({ username }: PortfolioViewProps) => {
  const {
    data : portfolio,
    isLoading,
    isError,
    error
  } = useGetPortfolioByUsernameQuery(username);



  if (isLoading) return <p>loading</p>
  if (isError) return <p>{error?.toString() || 'Failed to load portfolio'}</p>
  if (!portfolio) return <div>No portfolio found</div>;

  return (
    <div>
      {/* Render your portfolio data here */}
      <h1 className={`text-[${portfolio.primaryColor}]`}>{portfolio.hero.name}{portfolio.primaryColor}</h1>
      {/* ...other portfolio data */}
    </div>
  );
};

export default PortfolioView;