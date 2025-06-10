'use client'
import { UserData } from "@/types/userData";
import { aboutIsEmpty, arrayIsEmpty } from "../templateUtils";
import { mockHeroData } from "@/public/mockData";
const DefaultHome = ({ data }: { data: UserData }) => {
  const { hero, about, education, projects, experience, primaryColor } = data;
  
  return (
    <div><div>
      hero</div></div>
  );
};
export default DefaultHome;
