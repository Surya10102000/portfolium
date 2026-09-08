import React from "react";
import ExperienceCard from "./ExperienceCard";
import FadeIn from "@/app/_components/motion/FadeIn";

export interface Experience {
  _id?: string;
  role: string;
  duration: string;
  company: string;
  description?: string;
  location?: string;
  achievements?: string[];
  companyLogo?: string;
}

interface ExperienceListProps {
  experiences: Experience[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({ experiences }) => {
  // Calculate total experience
  const totalYears = experiences.reduce((acc, exp) => {
    const years = exp.duration.match(/\d+/);
    return acc + (years ? parseInt(years[0]) : 0);
  }, 0);

  const companies = [...new Set(experiences.map(exp => exp.company))];
  const yearsLabel = totalYears > 0 ? `${totalYears}+ years ` : "";

  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-12 bg-background text-foreground"
      id="experience"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Section */}
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-primary inline-block" />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">
                Experience
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
              {yearsLabel}
              <span className="italic font-normal text-muted-foreground">
                {yearsLabel ? "building" : "Building"}
              </span>{" "}
              interfaces people love.
            </h2>
          </div>

          <div className="text-left lg:text-right text-sm text-muted-foreground space-y-0.5">
            <span className="font-serif italic text-lg text-foreground block">
              {experiences.length} {experiences.length === 1 ? "role" : "roles"}
            </span>
            <p className="text-xs text-muted-foreground max-w-xs lg:ml-auto">
              across {companies.length} {companies.length === 1 ? "company" : "companies"} and teams.
            </p>
          </div>
        </FadeIn>

        {/* Sticky Stacking Cards Container */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={exp._id || `${exp.company}-${exp.role}`}
              className="sticky"
              style={{ top: `${80 + index * 20}px` }}
            >
              <FadeIn delay={Math.min(index, 3) * 0.1} amount={0.2}>
                <ExperienceCard experience={exp} index={index} />
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceList;
