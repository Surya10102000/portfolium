"use client";
import { useGetPortfolioQuery } from "@/services/portfolioApi";
import EditProfileBox from "./EditProfileColumn";
import PortfolioView from "./ProfileView";
import { ColorSelector } from "./ColorSelector";
import { UrlToggleGroup } from "./UrlToggleGroup";
import { useGetUsernameQuery } from "@/services/userApi";

const ProfileContainer = () => {
  const { data, isLoading, error } = useGetPortfolioQuery();
  const {data : userResponse } = useGetUsernameQuery()
  return (
    <>
    <div className="flex h-full">
      {/* left column container */}
      <div className="max-w-[320px] px-1 hidden md:block">
        <EditProfileBox />
      </div>
      {/* right preview container */}

      {data && userResponse && <div className="w-full px-4">
        {/* topbar */}
        <div className="flex justify-between items-center gap-2">
          <ColorSelector currentColor={data?.primaryColor as string} />

          <div className="flex-1">
            <UrlToggleGroup currentUsername={userResponse?.username as string}/>
          </div>
        </div>

        {/* <PortfolioView username={userResponse?.username as string} /> */}
      </div>}
    </div>
    </>
  );
};
export default ProfileContainer;
