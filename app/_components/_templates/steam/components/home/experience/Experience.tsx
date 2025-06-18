import { Experience as IExperience} from "@/types/userData";
import { SectionHeader } from "../../utils/SectionHeader";
import { ExperienceItem } from "./ExperienceItem";

export const Experience = ({experience} : {experience : IExperience[]}) => {
  return (
    <section className="section-wrapper" id="experience">
      <SectionHeader title="Experience" dir="l" />
      {experience.map((item,i) => (
        <ExperienceItem key={i} {...item} />
      ))}
    </section>
  );
};

