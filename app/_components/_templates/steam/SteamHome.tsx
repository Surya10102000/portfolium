"use client";
import { UserData } from "@/types/userData";
import { useMemo } from "react";
import { Heading } from "./components/nav/Heading";
import { Hero } from "./components/home/hero/Hero";
import { About } from "./components/home/about/About";
import { Projects } from "./components/home/projects/Projects";
import { Experience } from "./components/home/experience/Experience";
import { Contact } from "./components/home/contact/Contact";
import Education from "./components/home/education/Education";
const SteamHome = ({ data }: { data: UserData }) => {
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
      <Heading contact={contact} />
      {sectionChecks.hasHero && <Hero hero={hero} />}
      {(sectionChecks.hasAbout) && <About about={about} contact={contact} /> }
      
      {sectionChecks.hasProjects && <Projects projects={projects}/>}
      {sectionChecks.hasExperience && <Experience experience={experience}/>}
      {sectionChecks.hasEducation && <Education education={education}/>}
      <Contact contact={contact} />
    </div>
  );
};
export default SteamHome;
