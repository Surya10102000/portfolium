"use client";
import { useGetUsernameQuery } from "@/services/userApi";
import { UserData } from "@/types/userData";
import { ReactNode, useEffect } from "react";
import DefaultNavbar from "./components/DefaultNavbar";
import "./default-theme.css";
import { useTheme } from "next-themes";
import { ThemeProvider } from "./ThemeProvider";
import DefaultFooter from "./components/DefaultFooter";
import { mockUserData } from "@/public/mockData";

interface LayoutProps {
  children: ReactNode;
  userData: UserData;
}

const DefaultLayout = ({ children, userData }: LayoutProps) => {
  const { theme } = useTheme();

  // const {data }  = useGetUsernameQuery()
  // const username = data?.username;
  const data = mockUserData;

  const username = "new";
  return (
    <ThemeProvider>
      <div className={`username-theme mx-auto tracking-tight`}>
        <div className="px-5 md:px-7 lg:px-9 mx-auto tracking-tight">
          <nav className={`default-navbar`}>
            <DefaultNavbar />
          </nav>
          <main>{children}</main>
        </div>
        <div className="py-8"></div>
        <div>
          <DefaultFooter contact={data.contact} />
        </div>
      </div>
    </ThemeProvider>
  );
};
export default DefaultLayout;
