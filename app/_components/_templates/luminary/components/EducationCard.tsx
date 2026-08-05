import React, { useState } from "react";
import { motion as m, Variants } from "motion/react";
import {
  Award,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  Trophy,
  Sparkles,
} from "lucide-react";
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
  isLast?: boolean;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

const contentVariants: Variants = {
  collapsed: {
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
  expanded: {
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
};

const EducationCard: React.FC<EducationCardProps> = ({
  education,
  isLast = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Extract year from duration
  const year = education.duration?.match(/\d{4}/)?.[0] || "";

  return (
    <m.div
    variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20% 0px" }}
      className={cn("relative pl-12 pb-10 group", !isLast && "mb-2")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline Dot */}
      <m.div
        className="absolute left-0 top-1.5 flex items-center justify-center"
        animate={{
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {/* Outer ring */}
        <m.div
          className="absolute w-8 h-8 rounded-full border-2 border-primary/20"
          animate={{
            scale: isHovered ? 1.4 : 1,
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Inner dot */}
        <m.div
          className={cn(
            "relative w-6 h-6 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-primary to-primary/60",
            "shadow-lg shadow-primary/20",
          )}
          animate={{
            boxShadow: isHovered
              ? "0 0 30px rgba(107, 82, 161, 0.4)"
              : "0 0 15px rgba(107, 82, 161, 0.2)",
          }}
        >
          <m.div
            className="w-2 h-2 rounded-full bg-white"
            animate={{
              scale: isHovered ? [1, 1.3, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </m.div>
      </m.div>

      {/* Card */}
      <m.div
        className={cn(
          "relative rounded-2xl transition-all duration-300",
          "bg-card/50 backdrop-blur-sm border border-border/50",
          isHovered && "border-primary/30 shadow-xl shadow-primary/10",
          isExpanded && "bg-card/80",
        )}
        style={{
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              {/* Year Badge */}
              {year && (
                <m.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3"
                >
                  <Calendar className="w-3 h-3" />
                  {year}
                </m.div>
              )}

              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                {education.courseName}
              </h3>

              <m.div
                className="flex flex-wrap items-center gap-3 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-primary/60" />
                  <span>{education.universityName}</span>
                </div>

                {education.location && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary/60" />
                    <span>{education.location}</span>
                  </div>
                )}

                {education.duration && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary/60" />
                    <span>{education.duration}</span>
                  </div>
                )}
              </m.div>

              {/* Grade */}
              {education.grade && (
                <m.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20"
                >
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                    {education.grade}
                  </span>
                </m.div>
              )}
            </div>

            {/* Expand Button */}
            {education.description && education.description.length > 100 && (
              <m.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Read More
                  </>
                )}
              </m.button>
            )}
          </div>

          {/* Description */}
          {(education.description || education.achievements) && (
            <m.div
              variants={contentVariants}
              initial="collapsed"
              animate={
                isExpanded || education.description?.length || 0 < 100
                  ? "expanded"
                  : "collapsed"
              }
              className="mt-4 space-y-4"
            >
              {/* Description */}
              {education.description && (
                <m.p
                  className={cn(
                    "text-foreground/80 leading-relaxed text-sm md:text-base",
                    !isExpanded &&
                      education.description.length > 100 &&
                      "line-clamp-3",
                  )}
                >
                  {education.description}
                </m.p>
              )}

              {/* Achievements */}
              {education.achievements && education.achievements.length > 0 && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    y: isExpanded ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Trophy className="w-4 h-4" />
                    Achievements
                  </div>
                  <ul className="space-y-1.5">
                    {education.achievements.map((achievement, i) => (
                      <m.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: isExpanded ? 1 : 0,
                          x: isExpanded ? 0 : -10,
                        }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary/60 mt-1">✦</span>
                        <span>{achievement}</span>
                      </m.li>
                    ))}
                  </ul>
                </m.div>
              )}

              {/* Decorative elements */}
              <m.div
                className="flex items-center gap-2 pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: isExpanded ? 1 : 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
                <Sparkles className="w-3 h-3 text-primary/40" />
              </m.div>
            </m.div>
          )}
        </div>

        {/* Card glow effect on hover */}
        <m.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: "inset 0 0 40px rgba(107, 82, 161, 0.05)",
          }}
        />
      </m.div>

      {/* Connection line to next card */}
      {!isLast && (
        <m.div
          className="absolute left-3 top-10 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
      )}
    </m.div>
  );
};

export default EducationCard;
