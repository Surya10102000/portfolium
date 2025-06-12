import { UserData } from "@/types/userData";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  userData: UserData;
}

const MinimalLayout = ({ children, userData }: LayoutProps) => {
  console.log(userData)
  return (
    <div>
      <div>Navbar Minimal</div> <div>{children}</div>
    </div>
  );
};
export default MinimalLayout;
