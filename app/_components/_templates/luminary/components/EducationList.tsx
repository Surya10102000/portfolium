import React from "react";
import EducationCard from "./EducationCard";
import FadeIn from "@/app/_components/motion/FadeIn";

export interface Education {
  _id?: string;
  universityName: string;
  courseName: string;
  description?: string;
  duration?: string;
  location?: string;
  grade?: string;
  achievements?: string[];
}

interface EducationListProps {
  educations: Education[];
}

const EducationList: React.FC<EducationListProps> = ({ educations }) => {
  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-12 bg-background text-foreground"
      id="education"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Section */}
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-primary inline-block" />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">
                Education
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
              Trained in design,{" "}
              <span className="italic font-normal text-muted-foreground">
                learned
              </span>{" "}
              by shipping.
            </h2>
          </div>

          <div className="text-left lg:text-right text-sm text-muted-foreground space-y-0.5">
            <span className="font-serif italic text-lg text-foreground block">
              {educations.length} {educations.length === 1 ? "program" : "programs"}
            </span>
            <p className="text-xs text-muted-foreground max-w-xs lg:ml-auto">
              formal study, fellowships, and self-directed learning.
            </p>
          </div>
        </FadeIn>

        {/* Sticky Stacking Cards Container */}
        <div className="space-y-6">
          {educations.map((edu, index) => (
            <div
              key={edu._id || `${edu.universityName}-${edu.courseName}`}
              className="sticky"
              style={{ top: `${80 + index * 20}px` }}
            >
              <FadeIn delay={Math.min(index, 3) * 0.1} amount={0.2}>
                <EducationCard education={edu} index={index} />
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationList;
