"use client"
import { useGetUsernameQuery } from "@/services/userApi";
import { UserData } from "@/types/userData";
import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  userData: UserData;
}

const DefaultLayout = ({ children , userData }: LayoutProps) => {
  const {data }  = useGetUsernameQuery()

  const username = data?.username;
  return (
    <div>
       <nav className="default-navbar">
          Default Navbar
      </nav>
      <main>{children}</main>
    </div>
  ); 
};
export default DefaultLayout;
