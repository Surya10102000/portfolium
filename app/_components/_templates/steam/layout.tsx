"use client";
import { UserData } from "@/types/userData";
import { ReactNode } from "react";
import "./steam-theme.css";
import { ThemeProvider } from "../ThemeProvider";

interface LayoutProps {
  children: ReactNode;
  userData: UserData;
}

const DefaultLayout = ({ children, userData }: LayoutProps) => {
  return (
    <ThemeProvider>
      <div className={`mx-auto tracking-tight flex flex-col justify-between`}>
        <div className="flex-1 px-5 md:px-7 lg:px-9 mx-auto tracking-tight">
          <nav className={`default-navbar`}>
            {/* <DefaultNavbar portfolioData={userData} /> */}
          </nav>
          <main>{children}</main>
        </div>
        <div className="mt-8">
          {/* <DefaultFooter contact={userData.contact} /> */}
        </div>
      </div>
    </ThemeProvider>
  );
};
export default DefaultLayout;
