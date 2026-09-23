"use client";

import {
  ImageIcon,
  LayoutGrid,
  LayoutTemplate,
  Palette,
  Rocket,
  Share2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import FadeIn from "@/app/_components/motion/FadeIn";

const benefits = [
  {
    title: "No-code editor",
    description:
      "Fill in simple forms and Portfolium builds the page for you — no HTML, no CSS.",
    icon: Rocket,
  },
  {
    title: "Designed templates",
    description:
      "Pick from templates built for different styles, and switch anytime.",
    icon: LayoutTemplate,
  },
  {
    title: "Live, shareable link",
    description:
      "Every portfolio is published at your own username — ready to share.",
    icon: Share2,
  },
  {
    title: "Light & dark themes",
    description: "Your portfolio adapts to how your visitors like to browse.",
    icon: Palette,
  },
  {
    title: "Organized by section",
    description:
      "About, projects, experience and contact — each with its own dedicated editor.",
    icon: LayoutGrid,
  },
  {
    title: "Built-in image hosting",
    description:
      "Upload a hero photo and project images directly from the editor.",
    icon: ImageIcon,
  },
];

const [featured, ...rest] = benefits;

const Benefits = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need, nothing you don&apos;t
        </h2>
      </FadeIn>

      <div className="mt-16 grid gap-6">
        <FadeIn>
          <Card className="border-primary/10 bg-gradient-to-br from-card to-primary/5">
            <CardContent className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <featured.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{featured.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {featured.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((benefit, i) => (
            <FadeIn key={benefit.title} delay={i * 0.06}>
              <Card className="h-full">
                <CardContent className="flex flex-col items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <benefit.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
