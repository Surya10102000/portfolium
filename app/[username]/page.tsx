"use client";
import { useGetPortfolioByUsernameQuery } from "@/services/portfolioApi";
import { usePathname } from "next/navigation";

const page = () => {
  const username = usePathname();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetPortfolioByUsernameQuery(username);
  return (
    <div
      style={
        {
          "--primary-color": data?.primaryColor
        } as React.CSSProperties
      }
    >
      {username}
    </div>
  );
};
export default page;
