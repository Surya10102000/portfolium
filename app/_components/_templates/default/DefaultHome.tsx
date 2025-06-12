"use client";
import { UserData } from "@/types/userData";
import { aboutIsEmpty, arrayIsEmpty } from "../templateUtils";
import { mockHeroData, mockUserData } from "@/public/mockData";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import AboutSection from "./components/AboutSection";
import { ExperienceList } from "./components/ExperienceList";
import EducationList from "./components/EducationList";
const DefaultHome = ({ data }: { data: UserData }) => {
  // const { hero, about, education, projects, experience, primaryColor } = data;
  const {hero ,projects, about ,education, contact,experience} = mockUserData

  return (
    <div>
      <HeroSection hero={hero}/>
      <ProjectSection projects={projects}/>
      <AboutSection contact={contact} about={about}/>
      <ExperienceList experiences={experience}/>
      <EducationList educations={education}/>
    </div>
  );
};
export default DefaultHome;
