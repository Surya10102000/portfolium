"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Menu,
  Pencil,
  ExternalLink,
  Copy,
  LogIn,
  LogOut,
  UserPlus,
  User,
} from "lucide-react";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useGetUsernameQuery } from "@/services/userApi";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { AnimatedGradientText } from "@/components/AnimatedGradientText";
import { BlurInAnimation } from "@/components/BlurInAnimation";

// Lazy load the edit profile component
const EditProfileBox = dynamic(() => import("../profile/EditProfileColumn"), {
  loading: () => <div className="h-64 w-full animate-pulse bg-muted" />,
  ssr: false,
});

const Navbar = () => {
  const { data } = useGetUsernameQuery();
  const router = useRouter();
  const { data: session } = useSession();
  // Memoize the website URL to prevent recalculations
  const websiteUrl = useMemo(() => {
    return typeof window !== "undefined"
      ? `${window.location.origin}/${data?.username}`
      : "";
  }, [data?.username]);

  const copyWebsiteLink = () => {
    if (!websiteUrl) return;
    navigator.clipboard.writeText(websiteUrl);
    console.log("copy");
  };

  // Prefer static icons over dynamic ones
  const iconSize = 16;
  const iconClass = "mr-2";

  return (
    <div className="h-16 flex justify-between items-center px-4">
      <div onClick={() => router.push("/")}>
        <Logo className="text-primary" width={50} height={50} />
      </div>

      <div className="flex items-center gap-2">
        {data && (
          <Dialog>
            <BlurInAnimation duration={200}>
              <DialogTrigger asChild className="md:hidden">
                <Button size="icon" aria-label="Edit profile">
                  <Pencil size={iconSize} />
                </Button>
              </DialogTrigger>
            </BlurInAnimation>
            <DialogContent className="max-w-[95vw] max-h-[80lvh] sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <EditProfileBox />
            </DialogContent>
          </Dialog>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Menu">
              <Menu size={iconSize} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
            <DropdownMenuLabel className="flex justify-between items-center">
              <span className="truncate ">
                {session ? (
                  session.user?.name
                ) : (
                  <AnimatedGradientText className="font-semibold">
                    Portfolium
                  </AnimatedGradientText>
                )}
              </span>
              <ThemeToggle />
            </DropdownMenuLabel>
            {session ? (
              <>
                {session.user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => router.push("/profile")}>
                      <User size={iconSize} className={iconClass} />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => router.push(`/${data?.username}`)}
                    >
                      <ExternalLink size={iconSize} className={iconClass} />
                      <span>Go to my website</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={copyWebsiteLink}>
                      <Copy size={iconSize} className={iconClass} />
                      <span>Copy website link</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => signOut()}>
                      <LogOut size={iconSize} className={iconClass} />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </>
                )}
              </>
            ) : (
              <>
                <DropdownMenuItem onSelect={() => router.push("/signup")}>
                  <LogIn size={iconSize} className={iconClass} />
                  <span>Login</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push("/profile")}>
                  <UserPlus size={iconSize} className={iconClass} />
                  <span>Create my website</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
