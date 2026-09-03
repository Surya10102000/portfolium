import React, { useRef } from "react";
import { motion as m, useReducedMotion, Variants, useScroll, useTransform } from "motion/react";
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

// 80ms stagger keeps a multi-card list from entering all at once
// without feeling slow (SKILLS.md: 30-80ms for staggered entrances).
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const ExperienceList: React.FC<ExperienceListProps> = ({ experiences }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.95, 1, 0.95]);

  // Calculate total experience
  const totalYears = experiences.reduce((acc, exp) => {
    const years = exp.duration.match(/\d+/);
    return acc + (years ? parseInt(years[0]) : 0);
  }, 0);

  const companies = [...new Set(experiences.map(exp => exp.company))];
  const yearsLabel = totalYears > 0 ? `${totalYears}+ years ` : "";

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden"
      id="experience"
    >
      {/* Background Elements */}
      <m.div
        style={{ opacity, scale }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </m.div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
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

        {/* Experience Cards */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6"
        >
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp._id || `${exp.company}-${exp.role}`}
              experience={exp}
              index={index}
            />
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default ExperienceList;