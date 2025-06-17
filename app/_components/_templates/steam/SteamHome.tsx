"use client";
import { UserData } from "@/types/userData";
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
      {sectionChecks.hasHero && (<div>Steam home</div>)}
      {/* {sectionChecks.hasProjects && <ProjectSection projects={projects} />}
      {(sectionChecks.hasAbout) && (
        <AboutSection contact={contact} about={about} />
      )}
      {sectionChecks.hasExperience && (
        <ExperienceList experiences={experience} />
      )}
      {sectionChecks.hasEducation && <EducationList educations={education} />} */}
    </div>
  );
};
export default DefaultHome;
