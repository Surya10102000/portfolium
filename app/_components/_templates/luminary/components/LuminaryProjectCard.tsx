import { useState } from "react";
import { Project } from "@/types/userData";
import { cn } from "@/lib/utils";
import { GithubIcon, Link, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { motion as m, AnimatePresence, Variants } from "motion/react";

// Tech stack tags (extract from project or add as prop)
const techColors: Record<string, string> = {
  react: "bg-cyan-500/20 text-cyan-400",
  next: "bg-white/10 text-white",
  typescript: "bg-blue-500/20 text-blue-400",
  tailwind: "bg-teal-500/20 text-teal-400",
  node: "bg-green-500/20 text-green-400",
  python: "bg-yellow-500/20 text-yellow-400",
  vue: "bg-emerald-500/20 text-emerald-400",
  angular: "bg-red-500/20 text-red-400",
  docker: "bg-blue-400/20 text-blue-400",
  mongodb: "bg-green-600/20 text-green-500",
  postgresql: "bg-sky-600/20 text-sky-400",
  default: "bg-primary/20 text-primary",
};

// Card variants for hover animation
const cardVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const overlayVariants: Variants = {
  initial: { opacity: 0, backdropFilter: "blur(0px)" },
  hover: {
    opacity: 1,
    backdropFilter: "blur(8px)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const contentVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1, duration: 0.3 },
  },
};

const expandedVariants: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
};

// Extract tech stack from project (you might want to add this to your Project type)
const extractTechStack = (description: string): string[] => {
  const tech = ["react", "next", "typescript", "tailwind", "node", "python"];
  return tech.filter((t) => description.toLowerCase().includes(t));
};

const LuminaryProjectCard = ({
  projectName,
  description,
  image,
  githubLink,
  projectLink,
}: Project & { index?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const techStack = extractTechStack(description);

  return (
    <>
      {/* Card Container */}
      <m.div
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        className="relative group h-full rounded-2xl overflow-hidden bg-card border border-border/50 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/20">
          {image?.url ? (
            <>
              <m.div
                className="w-full h-full"
                animate={{
                  scale: isHovered ? 1.08 : 1,
                  filter: isHovered ? "brightness(0.7)" : "brightness(1)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src={image.url}
                  alt={projectName}
                  fill
                  className={cn(
                    "object-cover transition-all duration-700",
                    imageLoaded ? "opacity-100" : "opacity-0 scale-105",
                  )}
                  onLoad={() => setImageLoaded(true)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Loading Skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
                )}
              </m.div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary/20">
                {projectName.charAt(0)}
              </span>
            </div>
          )}

          {/* Gradient Overlay */}
          <m.div
            variants={overlayVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          />

          {/* Content Overlay */}
          <m.div
            variants={contentVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            className="absolute inset-0 flex flex-col justify-end p-6"
          >
            <div className="space-y-3">
              {/* Project Name */}
              <m.h3
                className="text-2xl font-bold text-white line-clamp-1"
                animate={{
                  y: isHovered ? 0 : 10,
                  opacity: isHovered ? 1 : 0.8,
                }}
              >
                {projectName}
              </m.h3>

              {/* Brief Description */}
              <m.p
                className="text-sm text-white/80 line-clamp-2"
                animate={{
                  y: isHovered ? 0 : 10,
                  opacity: isHovered ? 1 : 0,
                }}
              >
                {description}
              </m.p>

              {/* Tech Stack Tags */}
              <m.div
                className="flex flex-wrap gap-2 pt-2"
                animate={{
                  y: isHovered ? 0 : 10,
                  opacity: isHovered ? 1 : 0,
                }}
              >
                {techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      "px-2.5 py-1 text-xs font-medium rounded-full",
                      techColors[tech.toLowerCase()] || techColors.default,
                    )}
                  >
                    {tech}
                  </span>
                ))}
                {techStack.length > 3 && (
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/10 text-white/60">
                    +{techStack.length - 3}
                  </span>
                )}
              </m.div>

              {/* Action Buttons */}
              <m.div
                className="flex items-center gap-3 pt-2"
                animate={{
                  y: isHovered ? 0 : 10,
                  opacity: isHovered ? 1 : 0,
                }}
              >
                {githubLink && (
                  <m.a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </m.a>
                )}
                {projectLink && (
                  <m.a
                    href={projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link className="w-4 h-4" />
                  </m.a>
                )}
                <m.button
                  className="ml-auto p-2 rounded-full bg-primary/20 hover:bg-primary/30 text-white transition-colors backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded(true)}
                >
                  <Maximize2 className="w-4 h-4" />
                </m.button>
              </m.div>
            </div>
          </m.div>

          {/* Card Border Glow on Hover */}
          <m.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 30px rgba(107, 82, 161, 0.1)",
            }}
          />
        </div>
      </m.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <m.div
            variants={expandedVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsExpanded(false)}
          >
            <m.div
              className="relative max-w-4xl w-full max-h-[90vh] bg-card rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <m.button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsExpanded(false)}
              >
                <X className="w-5 h-5" />
              </m.button>

              {/* Expanded Image */}
              <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-secondary/20">
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={projectName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                )}
              </div>

              {/* Expanded Content */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-56.25%)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                      {projectName}
                    </h3>
                    {/* Full Description */}
                    <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Expanded Tech Stack */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className={cn(
                          "px-3 py-1.5 text-sm font-medium rounded-full",
                          techColors[tech.toLowerCase()] || techColors.default,
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                {(githubLink || projectLink) && (
                  <div className="mt-8 flex items-center gap-4 pt-6 border-t border-border/50">
                    {githubLink && (
                      <m.a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <GithubIcon className="w-4 h-4" />
                        View Code
                      </m.a>
                    )}
                    {projectLink && (
                      <m.a
                        href={projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/80 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link className="w-4 h-4" />
                        Live Demo
                      </m.a>
                    )}
                  </div>
                )}
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LuminaryProjectCard;
