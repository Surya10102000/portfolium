"use client";
import { UserData } from "@/types/userData";
import { aboutIsEmpty, arrayIsEmpty } from "../templateUtils";
import { mockHeroData, mockUserData } from "@/public/mockData";
import HeroSection from "./components/HeroSection";
const DefaultHome = ({ data }: { data: UserData }) => {
  // const { hero, about, education, projects, experience, primaryColor } = data;
  const {hero , about ,education, contact} = mockUserData

  return (
    <div>
      <HeroSection hero={hero} />
      <div className="h-screen bg-red-400" id="project">project</div>
      <div className="h-screen bg-green-600" id="education">education</div>
      <div className="h-screen bg-teal-500" id="experience">experience</div>
    </div>
  );
};
export default DefaultHome;
