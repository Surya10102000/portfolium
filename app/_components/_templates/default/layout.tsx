"use client";
import { useGetUsernameQuery } from "@/services/userApi";
import { UserData } from "@/types/userData";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import DefaultNavbar from "./components/DefaultNavbar";
import styles from "./layout.module.css";
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
        className={`${styles.figtreeFont} username-theme mx-auto tracking-tight`}
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
