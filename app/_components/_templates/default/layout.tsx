"use client";
import { UserData } from "@/types/userData";
import { ReactNode } from "react";
import DefaultNavbar from "./components/DefaultNavbar";
import "./default-theme.css";
import { ThemeProvider } from "./ThemeProvider";
import DefaultFooter from "./components/DefaultFooter";

interface LayoutProps {
  children: ReactNode;
  userData: UserData;
}

const DefaultLayout = ({ children, userData }: LayoutProps) => {
  return (
    <ThemeProvider>
      <div className={`username-theme mx-auto tracking-tight`}>
        <div className="px-5 md:px-7 lg:px-9 mx-auto tracking-tight">
          <nav className={`default-navbar`}>
            <DefaultNavbar portfolioData={userData} />
          </nav>
          <main>{children}</main>
        </div>
        <div className="py-8"></div>
        <div>
          <DefaultFooter contact={userData.contact} />
        </div>
      </div>
    </ThemeProvider>
  );
};
export default DefaultLayout;
