"use client";
import { UserData } from "@/types/userData";
// import { aboutIsEmpty, arrayIsEmpty } from "../templateUtils";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import AboutSection from "./components/AboutSection";
import { ExperienceList } from "./components/ExperienceList";
import EducationList from "./components/EducationList";
import { useMemo } from "react";
const DefaultHome = ({ data }: { data: UserData }) => {
  const { hero, about, education, projects, experience, contact } = data;

  const sectionChecks = useMemo(
    () => ({
      hasHero: !!(hero.name || hero.role || hero.description || hero.image),
      hasAbout: !!(about.aboutMe || about.whatIDo || about.techStack?.length),
      hasProjects: !!projects?.length,
      hasExperience: !!experience?.length,
      hasEducation: !!education?.length,
      hasContact: !!(
        contact.email ||
        contact.github ||
        contact.linkedIn ||
        contact.twitter
      ),
    }),
    [hero, about, projects, experience, education, contact]
  );

  return (
    <div>
      {sectionChecks.hasHero && <HeroSection hero={hero} />}
      {sectionChecks.hasProjects && <ProjectSection projects={projects} />}
      {(sectionChecks.hasAbout) && (
        <AboutSection contact={contact} about={about} />
      )}
      {sectionChecks.hasExperience && (
        <ExperienceList experiences={experience} />
      )}
      {sectionChecks.hasEducation && <EducationList educations={education} />}
    </div>
  );
};
export default DefaultHome;
