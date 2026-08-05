import React, { useState } from "react";
import { motion as m, Variants } from "motion/react";
import { 
  Building2, 
  Calendar, 
  MapPin, 
  ChevronDown, 
  ChevronUp,
  TrendingUp,
  Sparkles,
  Briefcase
} from "lucide-react";
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
  isLast?: boolean;
  className?: string;
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

// Company color mapping
const companyColors: Record<string, { bg: string; border: string; text: string }> = {
  google: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
  microsoft: { bg: "bg-blue-600/10", border: "border-blue-600/30", text: "text-blue-500" },
  amazon: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400" },
  meta: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
  apple: { bg: "bg-gray-500/10", border: "border-gray-500/30", text: "text-gray-400" },
  default: { bg: "bg-primary/10", border: "border-primary/30", text: "text-primary" },
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  isLast = false,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const { role, company, duration, description, location, achievements } = experience;
  
  // Get company color
  const companyKey = company.toLowerCase().split(" ")[0];
  const colors = companyColors[companyKey] || companyColors.default;
  
  // Extract year from duration
  const year = duration?.match(/\d{4}/)?.[0] || "";

  return (
    <m.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20% 0px" }}
      className={cn(
        "relative pl-0 md:pl-16",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline Dot - Desktop */}
      <div className="hidden md:block absolute left-0 top-1.5">
        <m.div
          className="flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {/* Outer ring */}
          <m.div
            className="absolute w-10 h-10 rounded-full border-2 border-primary/20"
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 0.3 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Inner dot */}
          <m.div
            className={cn(
              "relative w-8 h-8 rounded-full flex items-center justify-center",
              "bg-gradient-to-br from-primary to-primary/60",
              "shadow-lg shadow-primary/20"
            )}
            animate={{
              boxShadow: isHovered 
                ? "0 0 40px rgba(107, 82, 161, 0.4)" 
                : "0 0 20px rgba(107, 82, 161, 0.2)",
            }}
          >
            <Briefcase className="w-3.5 h-3.5 text-white" />
          </m.div>
        </m.div>
      </div>

      {/* Card */}
      <m.div
        className={cn(
          "relative rounded-2xl transition-all duration-300",
          "bg-card/50 backdrop-blur-sm border border-border/50",
          isHovered && "border-primary/30 shadow-xl shadow-primary/10",
          isExpanded && "bg-card/80"
        )}
        style={{
          transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        }}
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              {/* Company Badge */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium mb-3",
                  colors.bg,
                  colors.border,
                  colors.text
                )}
              >
                <Building2 className="w-4 h-4" />
                {company}
              </m.div>

              {/* Role */}
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                {role}
              </h3>

              {/* Metadata */}
              <m.div
                className="flex flex-wrap items-center gap-3 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary/60" />
                  <span>{duration}</span>
                </div>

                {location && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary/60" />
                    <span>{location}</span>
                  </div>
                )}

                {/* Year badge */}
                {year && (
                  <span className="px-2 py-0.5 text-xs font-mono rounded bg-primary/10 text-primary/70">
                    {year}
                  </span>
                )}
              </m.div>
            </div>

            {/* Expand Button */}
            {description && description.length > 120 && (
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

          {/* Description & Achievements */}
          {(description || achievements) && (
            <m.div
              variants={contentVariants}
              initial="collapsed"
              animate={isExpanded || description?.length || 0 < 120 ? "expanded" : "collapsed"}
              className="mt-4 space-y-4"
            >
              {/* Description */}
              {description && (
                <m.p
                  className={cn(
                    "text-foreground/80 leading-relaxed text-sm md:text-base",
                    !isExpanded && description.length > 120 && "line-clamp-3"
                  )}
                >
                  {description}
                </m.p>
              )}

              {/* Achievements */}
              {achievements && achievements.length > 0 && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: isExpanded ? 1 : 0,
                    y: isExpanded ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <TrendingUp className="w-4 h-4" />
                    Key Achievements
                  </div>
                  <ul className="space-y-2">
                    {achievements.map((achievement, i) => (
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

      {/* Connection line to next card - Desktop */}
      {!isLast && (
        <m.div
          className="hidden md:block absolute left-4 top-10 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
      )}
    </m.div>
  );
};

export default ExperienceCard;