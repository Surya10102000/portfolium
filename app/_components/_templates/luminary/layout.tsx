"use client";
import { ReactLenis } from 'lenis/react'
import { UserData } from "@/types/userData";
import { ReactNode } from "react";
import "./luminary-theme.css";
import { ThemeProvider } from "./ThemeProvider";
import LuminaryNavbar from "./components/LuminaryNavbar";
import LuminaryFooter from "./components/LuminaryFooter";

interface LayoutProps {
  children: ReactNode;
  userData: UserData;
}

const LuminaryLayout = ({ children, userData }: LayoutProps) => {
  return (
    <ThemeProvider>
      <ReactLenis root/>
      <div className={`mx-auto tracking-tight flex flex-col justify-between`}>
        <div className="flex-1 px-5 md:px-7 lg:px-9 mx-auto tracking-tight">
          <nav className={`default-navbar`}>
            <LuminaryNavbar portfolioData={userData} /> 
          </nav>
          <main>{children}</main>
        </div>
        <div className="mt-8">
          <LuminaryFooter contact={userData.contact} />
        </div>
      </div>
    </ThemeProvider>
  );
};
export default LuminaryLayout;
