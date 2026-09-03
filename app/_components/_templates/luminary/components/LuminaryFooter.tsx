import { ArrowUp } from "lucide-react";
import { motion as m, useReducedMotion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import ContactLinks from "./ContactLinks";
import FadeIn from "@/app/_components/motion/FadeIn";
import { EASE_OUT } from "../motionTokens";

export interface Contact {
  email?: string;
  github?: string;
  linkedIn?: string;
  twitter?: string;
}

const LuminaryFooter = ({ contact }: { contact: Contact }) => {
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show the back-to-top button once the reader has scrolled past the fold.
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative w-full overflow-hidden bg-background text-foreground" id="contact">
      {/* Background Dot Pattern Overlay — matches Hero & About */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(circle at 50% 40%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 20%, transparent 75%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
        <FadeIn className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[2px] bg-primary inline-block" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">
              Contact
            </span>
            <span className="w-8 h-[2px] bg-primary inline-block" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
            Let&apos;s start a{" "}
            <span className="italic font-normal text-muted-foreground">conversation</span>.
          </h2>

          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Have a project in mind or just want to say hello — I&apos;d love to hear from you.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10 flex justify-center">
          <ContactLinks contact={contact} iconSize={20} />
        </FadeIn>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 flex flex-col items-center gap-2 py-8 px-4 border-t border-border/60 text-sm text-muted-foreground/70">
        <span>© {new Date().getFullYear()} All rights reserved.</span>
        <span>
          Built with <span className="font-medium text-foreground/80">Portfolium</span>
        </span>
      </div>

      {/* Floating "Back to Top" button */}
      <AnimatePresence>
        {isVisible && (
          <m.button
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.9, y: reduceMotion ? 0 : 12 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full border border-border bg-card text-card-foreground shadow-sm transition-[background-color,color,border-color] duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-primary [@media(hover:hover)_and_(pointer:fine)]:hover:text-primary-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:border-primary"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </m.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default LuminaryFooter;
