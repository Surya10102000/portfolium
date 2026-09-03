import React, { useRef } from "react";
import { motion as m, useReducedMotion, Variants, useScroll, useTransform } from "motion/react";
import { GraduationCap, Sparkles, BookOpen, Calendar } from "lucide-react";
import EducationCard from "./EducationCard";
import { EASE_OUT } from "../motionTokens";

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const buildHeaderVariants = (reduceMotion: boolean): Variants => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
    },
  },
});

const EducationList: React.FC<EducationListProps> = ({ educations }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.95, 1, 0.95]);

  // Calculate total duration for timeline
  const totalDuration = educations.reduce((acc, edu) => {
    if (edu.duration) {
      const years = edu.duration.match(/\d+/);
      return acc + (years ? parseInt(years[0]) : 0);
    }
    return acc;
  }, 0);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden"
      id="education"
    >
      {/* Background Elements */}
      <m.div
        style={{ opacity, scale }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </m.div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <m.div
          variants={buildHeaderVariants(!!reduceMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-center gap-4 mb-12"
        >
          <m.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent to-primary/30"
          />
          
          <div className="flex items-center gap-3">
            <m.div
              initial={{ rotate: -180, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <GraduationCap className="w-6 h-6 text-primary" />
            </m.div>
            <span className="text-2xl font-bold text-foreground">
              Education Journey
            </span>
            <m.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </m.span>
          </div>
          
          <m.div
            initial={{ scaleX: 0, originX: 1 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block h-px flex-1 bg-gradient-to-l from-transparent to-primary/30"
          />
        </m.div>

        {/* Stats Bar */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-12"
        >
          {[
            { label: "Institutions", value: educations.length, icon: BookOpen },
            { label: "Years of Study", value: totalDuration || "—", icon: Calendar },
          ].map((stat, i) => (
            <m.div
              key={i}
              className="relative p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 text-center"
              whileHover={{
                y: -4,
                borderColor: "color-mix(in oklch, var(--primary) 30%, transparent)",
                boxShadow: "0 10px 30px color-mix(in oklch, var(--primary) 10%, transparent)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <stat.icon className="w-4 h-4 mx-auto mb-2 text-primary/60" />
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </m.div>
          ))}
        </m.div>

        {/* Timeline */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Vertical timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />

          {educations.map((edu, index) => (
            <EducationCard
              key={edu._id || `${edu.universityName}-${edu.courseName}`}
              education={edu}
              index={index}
              isLast={index === educations.length - 1}
            />
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default EducationList;


