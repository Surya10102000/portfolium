"use client";
import { UserData } from "@/types/userData";
import { ReactNode } from "react";
import "./steam-theme.css";
import styles from "./home.module.scss";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { SideBar } from "./components/nav/SideBar";
import { ThemeProvider } from "./ThemeProvider";
const poppins = Poppins({subsets : ['latin'], weight: ["100", "200", "400", "700", "900"] });

interface LayoutProps {
  children: ReactNode;
  userData: UserData;
}

const SteamLayout = ({ children, userData }: LayoutProps) => {
  return (
    <ThemeProvider>
      <div className={cn(poppins.className, styles.home)}>
        <SideBar portfolioData={userData}/>
        <main id="main">
          {children}
          <div
            style={{
              height: "200px",
              background:
                "linear-gradient(180deg, var(--background), var(--background-dark))",
            }}
          />
        </main>
      </div>
    </ThemeProvider>
  );
};
export default SteamLayout;
