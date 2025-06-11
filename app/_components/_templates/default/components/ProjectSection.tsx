import { Card } from "@/components/ui/card";
import { Project } from "@/types/userData";
import DefaultProjectCard from "./DefaultProjectCard";
import FadeIn from "@/app/_components/motion/FadeIn";

const ProjectSection = ({ projects }: { projects: Project[] }) => {
  return (
    <div id="project" className="lg:px-11">
      <FadeIn delay={1}>
        <div className="py-8">
          <p className="capitalize font-bold">project.</p>
        </div>
      </FadeIn>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <FadeIn key={i} delay={1}>
            <DefaultProjectCard {...project} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};
export default ProjectSection;
