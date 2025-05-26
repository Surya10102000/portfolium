'use client'
import { useGetPortfolioQuery } from "@/services/portfolioApi";
import EditProfileBox from "./EditProfileColumn";

const ProfileContainer = () => {
  const { data, isLoading, error } = useGetPortfolioQuery();
  return (
    <div className="flex h-full">
      {/* left column container */}
      <div className="max-w-[320px] px-1 hidden md:block">
        <EditProfileBox />
      </div>
      {/* right preview container */}
      <div className="border-l">preview</div>
    </div>
  );
};
export default ProfileContainer;
