import React from "react";
import { Project } from "@/types/userData";
import LuminaryProjectCard from "./LuminaryProjectCard";

export const ProjectSection = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-12 bg-background text-foreground" id="project">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-primary inline-block" />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">
                Projects & Work
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
              Featured projects <span className="italic font-normal text-muted-foreground">crafted</span> with care.
            </h2>
          </div>

          <div className="text-left lg:text-right text-sm text-muted-foreground space-y-0.5">
            <span className="font-serif italic text-lg text-foreground block">
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </span>
            <p className="text-xs text-muted-foreground max-w-xs">
              across full-stack, design systems, and web interactions.
            </p>
          </div>
        </div>

        {/* Sticky Stacking Cards Container */}
        <div className="space-y-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="sticky transition-all duration-300"
              style={{
                top: `${80 + i * 20}px`, // Stacks each card with a slight vertical overlap offset
              }}
            >
              <LuminaryProjectCard {...project} index={i} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectSection;