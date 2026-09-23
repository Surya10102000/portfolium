"use client";

import { LogIn, Share2, Wand2 } from "lucide-react";
import FadeIn from "@/app/_components/motion/FadeIn";

const steps = [
  {
    title: "Sign in with Google",
    description: "No forms, no passwords to remember — just your Google account.",
    icon: LogIn,
  },
  {
    title: "Fill in your story",
    description:
      "Add your about, projects, experience and contact info, then pick a template.",
    icon: Wand2,
  },
  {
    title: "Publish your portfolio",
    description: "Your portfolio goes live instantly at your own shareable link.",
    icon: Share2,
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
    >
      <FadeIn className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Live in three steps
        </h2>
      </FadeIn>

      <div className="mt-16 grid gap-10 sm:grid-cols-3">
        {steps.map((step, i) => (
          <FadeIn
            key={step.title}
            delay={i * 0.08}
            className="text-center sm:text-left"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary sm:mx-0">
              <step.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <span className="mt-4 block text-sm font-semibold text-primary">
              Step {i + 1}
            </span>
            <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {step.description}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
