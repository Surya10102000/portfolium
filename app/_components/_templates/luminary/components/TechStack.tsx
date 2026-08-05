import { useInView, motion as m, Variants } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Map of tech icons (you can expand this)
const techIcons: Record<string, string> = {
  react: "⚛️",
  next: "▲",
  typescript: "📘",
  javascript: "📜",
  tailwind: "🎨",
  css: "🎭",
  html: "🌐",
  node: "🟢",
  python: "🐍",
  vue: "🟩",
  angular: "🅰️",
  docker: "🐳",
  kubernetes: "☸️",
  aws: "☁️",
  graphql: "📊",
  mongodb: "🍃",
  postgresql: "🐘",
  mysql: "🐬",
  redis: "🔴",
  git: "📦",
  github: "🐙",
  figma: "🎯",
  default: "💻",
};

// Color mapping for tech tags
const techColors: Record<string, string> = {
  react: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  next: "bg-white/10 text-white border-white/20",
  typescript: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  javascript: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  tailwind: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  node: "bg-green-500/15 text-green-400 border-green-500/30",
  python: "bg-yellow-600/15 text-yellow-500 border-yellow-600/30",
  vue: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  angular: "bg-red-500/15 text-red-400 border-red-500/30",
  docker: "bg-blue-400/15 text-blue-400 border-blue-400/30",
  mongodb: "bg-green-600/15 text-green-500 border-green-600/30",
  postgresql: "bg-sky-600/15 text-sky-400 border-sky-600/30",
  default: "bg-primary/15 text-primary border-primary/30",
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const TechStack = ({ techStack }: { techStack: string[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-30% 0px -10% 0px",
  });

  return (
    <m.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="flex flex-wrap gap-2.5"
    >
      {techStack?.map((tech, i) => {
        const techKey = tech.toLowerCase();
        const icon = techIcons[techKey] || techIcons.default;
        const colorClass = techColors[techKey] || techColors.default;
        const isHovered = hoveredIndex === i;

        return (
          <m.span
            key={i}
            variants={itemVariants}
            className={cn(
              "group relative inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-full border transition-all duration-300 cursor-default",
              colorClass,
              isHovered && "scale-110 shadow-lg"
            )}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{
              y: -2,
              transition: { type: "spring", stiffness: 400 },
            }}
          >
            {/* Icon */}
            <span className="text-base">{icon}</span>
            
            {/* Tech name */}
            <span>{tech}</span>

            {/* Hover glow effect */}
            <m.span
              className={cn(
                "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                "bg-gradient-to-r from-primary/20 to-transparent"
              )}
              initial={false}
              animate={{
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.3 : 0,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Tooltip on hover */}
            <m.div
              className={cn(
                "absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 text-xs font-mono bg-foreground/90 text-background rounded opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap"
              )}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? -4 : 0,
              }}
            >
              {tech}
            </m.div>
          </m.span>
        );
      })}
    </m.div>
  );
};

export default TechStack;