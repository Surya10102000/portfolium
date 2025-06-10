"use client"
import { useGetUsernameQuery } from "@/services/userApi";
import { UserData } from "@/types/userData";
import Link from "next/link";
import { ReactNode } from "react";
import DefaultNavbar from "./components/DefaultNavbar";
import styles from './layout.module.css'

interface LayoutProps {
  children: ReactNode;
  userData: UserData;
}

const DefaultLayout = ({ children , userData }: LayoutProps) => {
  // const {data }  = useGetUsernameQuery()
  // const username = data?.username;

  const username = "new"
  return (
    <div className={`${styles.figtreeFont} mx-auto tracking-tight`}>
       <nav className={`default-navbar`}>
          <DefaultNavbar/>
      </nav>
      <main >{children}</main>
    </div>
  ); 
};
export default DefaultLayout;
