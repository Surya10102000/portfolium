"use client";
import { useGetPortfolioQuery } from "@/services/portfolioApi";
import EditProfileBox from "./EditProfileColumn";
import PortfolioView from "./ProfileView";
import { UrlToggleGroup } from "./UrlToggleGroup";
import { useGetUsernameQuery } from "@/services/userApi";
import { ViewModeToggle } from "./ViewModeToggle";
import { TemplateSelector } from "./TemplateSelector";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileContainer = () => {
  const { data, isLoading, isError, refetch } = useGetPortfolioQuery();
  const {
    data: userResponse,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUsername,
  } = useGetUsernameQuery();

  if (isLoading || isUserLoading) {
    return (
      <div className="flex">
        {/* left column skeleton */}
        <div className="max-w-[320px] w-full px-1 py-2 pr-3 hidden md:block md:border-r">
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-[76px] w-full rounded-md" />
            ))}
          </div>
        </div>
        {/* right column skeleton */}
        <div className="w-full px-4 py-2">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <Skeleton className="h-9 w-[160px]" />
            <Skeleton className="h-9 flex-1 min-w-[200px]" />
            <Skeleton className="h-9 w-[110px] hidden md:block" />
          </div>
          <div className="py-4">
            <Skeleton className="h-[80vh] w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
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
      <div className="max-w-[320px] w-full px-1 py-2 pr-3 hidden md:block md:border-r">
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
