import React from "react";
import { motion as m, useReducedMotion, Variants } from "motion/react";
import { cn } from "@/lib/utils";

interface Experience {
  _id?: string;
  role: string;
  duration: string;
  company: string;
  description?: string;
  location?: string;
  achievements?: string[];
  companyLogo?: string;
}

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
  className?: string;
}

const buildCardVariants = (reduceMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reduceMotion ? 0 : 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
});

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  className = "",
}) => {
  const reduceMotion = useReducedMotion();
  const { role, company, duration, description, location, achievements } = experience;

  // "2022 - Present" -> start "2022", end "Present" (styled as an active status)
  const durationParts = duration.split(/[-–—]/).map((part) => part.trim()).filter(Boolean);
  const startDate = durationParts[0] ?? duration;
  const endDate = durationParts[1];
  const isCurrent = !!endDate && /present/i.test(endDate);

  return (
    <m.div
      variants={buildCardVariants(!!reduceMotion)}
      className={cn(
        "group relative w-full bg-card text-card-foreground border border-border/60 rounded-[var(--radius)] p-6 sm:p-8 shadow-sm transition-[box-shadow,border-color] duration-300",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-md [@media(hover:hover)_and_(pointer:fine)]:hover:border-primary/30",
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
        {/* Date range */}
        <div className="md:col-span-3">
          <span className="text-sm text-muted-foreground">
            {startDate}
            {endDate && (
              <>
                {" — "}
                {isCurrent ? (
                  <span className="inline-flex items-center gap-1.5 text-primary font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Present
                  </span>
                ) : (
                  endDate
                )}
              </>
            )}
          </span>
        </div>

        {/* Role & company */}
        <div className="md:col-span-4">
          <h3 className="text-2xl sm:text-3xl font-serif text-card-foreground leading-snug">
            {role}
          </h3>
          <p className="font-serif italic text-muted-foreground mt-1">
            at {company}
          </p>
        </div>

        {/* Description & tags */}
        <div className="md:col-span-5 space-y-4">
          {description && (
            <p className="text-muted-foreground leading-relaxed text-base">
              {description}
            </p>
          )}

          {(location || (achievements && achievements.length > 0)) && (
            <div className="flex flex-wrap gap-2">
              {location && (
                <span className="px-3 py-1 rounded-full border border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider bg-accent/40">
                  {location}
                </span>
              )}
              {achievements?.slice(0, 3).map((achievement) => (
                <span
                  key={achievement}
                  className="max-w-[12rem] truncate px-3 py-1 rounded-full border border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider bg-accent/40"
                  title={achievement}
                >
                  {achievement}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
};

export default ExperienceCard;
