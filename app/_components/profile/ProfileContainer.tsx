"use client";
import { useGetPortfolioQuery } from "@/services/portfolioApi";
import EditProfileBox from "./EditProfileColumn";
import PortfolioView from "./ProfileView";
import { UrlToggleGroup } from "./UrlToggleGroup";
import { useGetUsernameQuery } from "@/services/userApi";
import { ViewModeToggle } from "./ViewModeToggle";
import LoadingComponent from "../Loader/LoadingComponent";
import { TemplateSelector } from "./TemplateSelector";
import { Button } from "@/components/ui/button";

const ProfileContainer = () => {
  const { data, isLoading, isError, refetch } = useGetPortfolioQuery();
  const {
    data: userResponse,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUsername,
  } = useGetUsernameQuery();

  if (isLoading || isUserLoading) {
    return <LoadingComponent/>
  }

  if (isError || isUserError || !data || !userResponse) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-[80vh] px-4 text-center">
        <p className="text-lg font-medium">We couldn&apos;t load your portfolio</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Something went wrong while fetching your data. Please try again.
        </p>
        <Button
          onClick={() => {
            refetch();
            refetchUsername();
          }}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* left column container */}
      <div className="max-w-[320px] px-1 py-2 hidden md:block">
        <EditProfileBox/>
      </div>
      {/* right preview container */}
      <div className="w-full px-4 py-2">
        {/* topbar */}
        <div className="flex flex-wrap justify-between items-center gap-2">
          <TemplateSelector currentTemplate={data.template as string} />

          <div className="flex-1 min-w-[200px]">
            <UrlToggleGroup currentUsername={userResponse.username as string} />
          </div>

          <ViewModeToggle/>
        </div>

        <PortfolioView username={userResponse.username as string} />
      </div>
    </div>
  );
};
export default ProfileContainer;
