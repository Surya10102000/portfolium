import { UserData } from "@/types/userData";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  userData: UserData;
}

const MinimalLayout = ({ children, userData }: LayoutProps) => {
  return (
    <div>
      <div>Navbar {userData.template}</div> <div>{children}</div>
    </div>
  );
};
export default MinimalLayout;
