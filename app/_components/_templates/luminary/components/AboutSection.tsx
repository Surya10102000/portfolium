import { AboutSection as AboutSectionI } from '@/types/userData';
import React from 'react';
import FadeIn from '@/app/_components/motion/FadeIn';
import TechStack from './TechStack';

export const AboutSection = ({
  about
}: {
  about  : AboutSectionI
}) => {
  return (
    <section id="about" className="relative min-h-screen w-full bg-background text-foreground flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Soft Background Radial Gradient & Grid Overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 80%)'
        }}
      />

      <div className="relative z-10 max-w-5xl w-full mx-auto space-y-16">

        {/* Section Header */}
        <FadeIn className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-primary inline-block"></span>
            <span className="text-xs md:text-sm font-bold tracking-widest text-primary uppercase">
              About Me
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-foreground leading-[1.1]">
            Passionate about <span className="italic font-normal text-muted-foreground">crafting</span> intuitive digital experiences.
          </h2>
        </FadeIn>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* About Me Card */}
          <FadeIn delay={0.1} className="bg-card/60 backdrop-blur-md rounded-3xl p-8 border border-border/60 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
                Background & Story
              </h3>
              <p className="text-card-foreground leading-relaxed text-base md:text-lg">
                {about.aboutMe}
              </p>
            </div>
          </FadeIn>

          {/* What I Do Card */}
          <FadeIn delay={0.2} className="bg-card/60 backdrop-blur-md rounded-3xl p-8 border border-border/60 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
                What I Do
              </h3>
              <p className="text-card-foreground leading-relaxed text-base md:text-lg">
                {about.whatIDo}
              </p>
            </div>
          </FadeIn>

        </div>

        {/* Tech Stack Pills Section */}
        {about?.techStack && about.techStack.length > 0 && (
          <FadeIn delay={0.1} className="pt-6 border-t border-border/60">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
              Technologies & Tools
            </h3>
            <TechStack techStack={about.techStack} />
          </FadeIn>
        )}

      </div>
    </section>
  );
};

export default AboutSection;
