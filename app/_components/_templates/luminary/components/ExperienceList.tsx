import React, { useRef } from "react";
import { motion as m, Variants, useScroll, useTransform } from "motion/react";
import { Briefcase, Sparkles, Clock, Building2, Users } from "lucide-react";
import ExperienceCard from "./ExperienceCard";

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ExperienceList: React.FC<ExperienceListProps> = ({ experiences }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Calculate total experience
  const totalYears = experiences.reduce((acc, exp) => {
    const years = exp.duration.match(/\d+/);
    return acc + (years ? parseInt(years[0]) : 0);
  }, 0);

  const companies = [...new Set(experiences.map(exp => exp.company))];

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
        <m.div
          variants={headerVariants}
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
              <Briefcase className="w-6 h-6 text-primary" />
            </m.div>
            <span className="text-2xl font-bold text-foreground">
              Work Experience
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: "Companies", value: companies.length, icon: Building2 },
            { label: "Years Experience", value: totalYears || "—", icon: Clock },
            { label: "Roles", value: experiences.length, icon: Briefcase },
            { label: "Team Size", value: "10+", icon: Users },
          ].map((stat, i) => (
            <m.div
              key={i}
              className="relative p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 text-center"
              whileHover={{
                y: -4,
                borderColor: "rgba(107, 82, 161, 0.3)",
                boxShadow: "0 10px 30px rgba(107, 82, 161, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <stat.icon className="w-4 h-4 mx-auto mb-2 text-primary/60" />
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </m.div>
          ))}
        </m.div>

        {/* Experience Cards */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative space-y-6"
        >
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden md:block" />

          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp._id || `${exp.company}-${exp.role}`}
              experience={exp}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default ExperienceList;