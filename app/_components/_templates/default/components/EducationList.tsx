import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import FadeIn from "@/app/_components/motion/FadeIn";

export interface Education {
  _id?: string;
  universityName: string;
  courseName: string;
  description?: string;
  duration?: string;
}

interface EducationCardProps {
  education: Education;
  isLast?: boolean;
}

const EducationCard: React.FC<EducationCardProps> = ({
  education,
  }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 0.5 }}
      className="flex relative pb-8"
    >


      <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-foreground"></div>

      <div className="ml-5 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground/80">
            {education.courseName}
          </h3>
          {education.duration && (
            <span className="text-sm text-muted-foreground">
              {education.duration}
            </span>
          )}
        </div>

        <div className="flex items-center mt-1">
          <Award className="text-yellow-500 mr-2" size={16} />
          <p className="text-muted-foreground">
            {education.universityName}
          </p>
        </div>

        {education.description && (
          <p className="mt-2 text-foreground/90 max-w-4xl">
            {education.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

interface EducationListProps {
  educations: Education[];
}

export const EducationList: React.FC<EducationListProps> = ({ educations }) => {
  return (
    <div id="education" className="lg:px-11">
        <FadeIn>
        <div className="py-12">
          <p className="capitalize font-bold">Education.</p>
        </div>
      </FadeIn>
      <div className="space-y-1">
        {educations.map((edu, index) => (
          <EducationCard
            key={edu._id || `${edu.universityName}-${edu.courseName}`}
            education={edu}
            isLast={index === educations.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default EducationList;
