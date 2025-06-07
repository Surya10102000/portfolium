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
        <Link href={`/${username}`}>Home</Link>
        {userData.about && <Link href={`/${username}/about`}>About</Link>}
        {userData.projects?.length > 0 && (
          <Link href={`/${username}/projects`}>Projects</Link>
        )}
      </nav><div>{children}</div>
    </div>
  ); 
};
export default DefaultLayout;
