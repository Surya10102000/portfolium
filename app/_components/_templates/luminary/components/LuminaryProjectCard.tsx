import React from "react";
import { Project } from "@/types/userData";
import { GithubIcon, ExternalLink } from "lucide-react";

export const LuminaryProjectCard = ({
  projectName,
  description,
  githubLink,
  projectLink,
}: Project & { index?: number }) => {
  return (
    <div className="w-full bg-card text-card-foreground border border-border rounded-[var(--radius)] p-6 sm:p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Side: Project Title & Links */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-2xl sm:text-3xl font-serif text-card-foreground leading-snug">
            {projectName}
          </h3>

          <div className="flex items-center gap-4 text-sm pt-1">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-serif italic text-primary hover:opacity-80 transition-opacity"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
            {projectLink && (
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-serif italic text-primary hover:opacity-80 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Project</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Side: Description */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-muted-foreground text-base leading-relaxed">
            {description}
          </p>

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1 rounded-full border border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider bg-accent/40">
              FEATURED
            </span>
            <span className="px-3 py-1 rounded-full border border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider bg-accent/40">
              FULLSTACK
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuminaryProjectCard;
