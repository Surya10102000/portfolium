"use client";
import { useGetUsernameQuery } from "@/services/userApi";
import { UserData } from "@/types/userData";
import { ReactNode, useEffect } from "react";
import DefaultNavbar from "./components/DefaultNavbar";
import "./default-theme.css";
import { useTheme } from "next-themes";
import { ThemeProvider } from "./ThemeProvider";

interface LayoutProps {
  children: ReactNode;
  userData: UserData;
}

const DefaultLayout = ({ children, userData }: LayoutProps) => {
  const { theme } = useTheme();

  // const {data }  = useGetUsernameQuery()
  // const username = data?.username;

  const username = "new";
  return (
    <ThemeProvider>
      <div
        className={`username-theme px-5 md:px-7 lg:px-9 mx-auto tracking-tight`}
      >
        <nav className={`default-navbar`}>
          <DefaultNavbar />
        </nav>
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
};
export default DefaultLayout;
