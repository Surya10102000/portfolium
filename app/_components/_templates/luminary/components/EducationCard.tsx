import React from "react";
import { cn } from "@/lib/utils";

interface Education {
  _id?: string;
  universityName: string;
  courseName: string;
  description?: string;
  duration?: string;
  location?: string;
  grade?: string;
  achievements?: string[];
}

interface EducationCardProps {
  education: Education;
  index?: number;
  className?: string;
}

const EducationCard: React.FC<EducationCardProps> = ({
  education,
  className = "",
}) => {
  const { universityName, courseName, description, duration, location, grade, achievements } = education;

  // "2014 - 2018" -> "2014 — 2018" (em dash to match the section's typographic style)
  const displayDuration = duration?.replace(/\s*[-–—]\s*/, " — ");

  return (
    <div
      className={cn(
        "group relative w-full bg-card text-card-foreground border border-border rounded-[var(--radius)] p-6 sm:p-8 md:p-10 shadow-sm transition-[box-shadow,border-color] duration-300",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-md [@media(hover:hover)_and_(pointer:fine)]:hover:border-primary/40",
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
        {/* Duration */}
        <div className="md:col-span-2">
          {displayDuration && (
            <span className="text-sm text-muted-foreground">{displayDuration}</span>
          )}
        </div>

        {/* University & course */}
        <div className="md:col-span-4">
          <h3 className="text-xl sm:text-2xl font-serif text-card-foreground leading-snug">
            {universityName}
          </h3>
          <p className="font-serif italic text-muted-foreground mt-1">
            {courseName}
          </p>
        </div>

        {/* Description & tags */}
        <div className="md:col-span-6 space-y-4">
          {description && (
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {description}
            </p>
          )}

          {(location || grade || (achievements && achievements.length > 0)) && (
            <div className="flex flex-wrap gap-2">
              {location && (
                <span className="px-3 py-1 rounded-full border border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {location}
                </span>
              )}
              {grade && (
                <span className="px-3 py-1 rounded-full border border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {grade}
                </span>
              )}
              {achievements?.slice(0, 3).map((achievement) => (
                <span
                  key={achievement}
                  className="max-w-[14rem] truncate px-3 py-1 rounded-full border border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
                  title={achievement}
                >
                  {achievement}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
