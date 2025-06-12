import React from "react";
import { motion } from "motion/react";
import FadeIn from "@/app/_components/motion/FadeIn";

export interface Experience {
  _id?: string;
  role: string;
  duration: string;
  company: string;
  description?: string;
}

interface ExperienceCardProps {
  experience: Experience;
  className?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      className={`${className}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl md:text-2xl font-bold ">{experience.role}</h3>
          <p className="text-lg text-muted-foreground">{experience.company}</p>
        </div>
        <span className="px-3 py-1 text-sm bg-foreground text-background rounded-full">
          {experience.duration}
        </span>
      </div>

      {experience.description && (
        <div className="mt-4">
          <p className="whitespace-pre-line tracking-wider max-w-4xl  lg:text-lg">
            {experience.description}
          </p>
        </div>
      )}
    </motion.div>
  );
};

interface ExperienceListProps {
  experiences: Experience[];
}

export const ExperienceList: React.FC<ExperienceListProps> = ({
  experiences,
}) => {
  return (
    <div id="experience" className=" lg:px-11 ">
      <FadeIn>
        <div className="py-12">
          <p className="capitalize font-bold">Experience.</p>
        </div>
      </FadeIn>
      <div className="space-y-8 lg:space-y-10 ">
        {experiences.map((exp) => (
          <ExperienceCard
            key={exp._id || `${exp.company}-${exp.role}`}
            experience={exp}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceCard;
