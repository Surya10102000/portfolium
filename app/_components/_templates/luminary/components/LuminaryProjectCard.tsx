import React from "react";
import Image from "next/image";
import { Project } from "@/types/userData";
import { ArrowUpRight } from "lucide-react";

export const LuminaryProjectCard = ({
  projectName,
  description,
  date,
  image,
  githubLink,
  projectLink,
  index = 0,
}: Project & { index?: number }) => {
  const primaryLink = projectLink || githubLink;
  const number = String(index + 1).padStart(2, "0");
  const metaItems = [date, githubLink ? "Source" : null, projectLink ? "Live" : null].filter(
    Boolean
  ) as string[];

  // Split a multi-word project name into a title + subtitle, mirroring
  // "Coherence" / "Cloud Deployment" — prefer a natural " - " break,
  // otherwise fall back to splitting off the first word.
  const dashSplit = projectName.split(/\s+[-–—:]\s+/);
  const [title, subtitle] =
    dashSplit.length > 1
      ? [dashSplit[0], dashSplit.slice(1).join(" - ")]
      : (() => {
          const words = projectName.trim().split(/\s+/);
          return words.length > 1
            ? [words[0], words.slice(1).join(" ")]
            : [projectName, null];
        })();

  return (
    <div className="group relative w-full bg-card text-card-foreground border border-border rounded-[var(--radius)] p-6 sm:p-8 md:p-10 shadow-sm transition-[box-shadow,border-color] duration-300 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-md [@media(hover:hover)_and_(pointer:fine)]:hover:border-primary/40">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
        {/* Left: Content */}
        <div className="lg:col-span-3 space-y-4 lg:pr-6">
          <span className="block font-serif italic text-base sm:text-lg text-muted-foreground/70">
            {number}
          </span>

          <h3 className="text-3xl sm:text-4xl font-serif text-card-foreground leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="font-serif italic text-2xl sm:text-3xl text-muted-foreground/80 leading-tight -mt-1">
              {subtitle}
            </p>
          )}

          <p className="text-muted-foreground text-base leading-relaxed max-w-md line-clamp-3">
            {description}
          </p>

          {metaItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-1 text-[11px] font-semibold tracking-widest text-muted-foreground/80 uppercase">
              {metaItems.map((item, i) => (
                <React.Fragment key={item}>
                  {i > 0 && (
                    <span aria-hidden="true" className="text-muted-foreground/40">
                      •
                    </span>
                  )}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Right: Image */}
        <div className="lg:col-span-2 relative aspect-[4/3] sm:aspect-video lg:aspect-square rounded-[calc(var(--radius)-0.75rem)] overflow-hidden border border-border/60 bg-foreground/5">
          {image?.url ? (
            <Image
              src={image.url}
              alt={projectName}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover transition-transform duration-500 ease-[var(--ease-out)] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-secondary via-accent/60 to-secondary/40">
              <div
                className="absolute inset-0 opacity-70 [background-size:18px_18px]"
                style={{
                  backgroundImage:
                    "radial-gradient(color-mix(in oklch, var(--primary) 40%, transparent) 1.5px, transparent 1.5px)",
                }}
              />
              <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-primary/25 blur-3xl" />
              <div className="absolute -left-6 -bottom-10 w-28 h-28 rounded-full bg-primary/15 blur-2xl" />
            </div>
          )}
        </div>
      </div>

      {/* Floating link button */}
      {primaryLink && (
        <a
          href={primaryLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${projectName}`}
          className="absolute z-10 flex items-center justify-center rounded-full border border-border bg-card text-card-foreground w-11 h-11 bottom-6 right-6 transition-[background-color,color,border-color] duration-200 ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-primary [@media(hover:hover)_and_(pointer:fine)]:hover:text-primary-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:border-primary lg:w-12 lg:h-12 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2"
        >
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      )}
    </div>
  );
};

export default LuminaryProjectCard;
