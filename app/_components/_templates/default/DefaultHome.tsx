"use client";
import { UserData } from "@/types/userData";
import { aboutIsEmpty, arrayIsEmpty } from "../templateUtils";
import { mockHeroData, mockUserData } from "@/public/mockData";
const DefaultHome = ({ data }: { data: UserData }) => {
  // const { hero, about, education, projects, experience, primaryColor } = data;
  const {hero , about ,education} = mockUserData

  return (
    <div className="">
      <div className="h-screen bg-amber-300" id="hero">hero</div>
      <div className="h-screen bg-red-400" id="project">project</div>
      <div className="h-screen bg-green-600" id="education">education</div>
      <div className="h-screen bg-teal-500" id="experience">experience</div>
    </div>
  );
};
export default DefaultHome;
