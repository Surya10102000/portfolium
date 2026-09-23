"use client";

import { Card, CardContent } from "@/components/ui/card";
import FadeIn from "@/app/_components/motion/FadeIn";
import { templateOptions } from "@/app/_components/profile/TemplateSelector";

const vibe: Record<string, string> = {
  default: "Clean, sharp, monochrome",
  luminary: "Soft, elegant, editorial",
  steam: "Bold, dark, neon-accented",
};

const TemplatesShowcase = () => {
  return (
    <section id="templates" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Templates for every kind of work
        </h2>
        <p className="mt-4 text-muted-foreground">
          Switch anytime from your profile — your content carries over.
        </p>
      </FadeIn>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {templateOptions.map((template, i) => (
          <FadeIn key={template.value} delay={i * 0.08}>
            <Card className="overflow-hidden py-0">
              <div
                className="flex aspect-video flex-col justify-end gap-2 p-5"
                style={{ background: template.swatch.bg }}
                aria-hidden="true"
              >
                <span
                  className="h-2 w-2/3 rounded-full"
                  style={{ background: template.swatch.accent }}
                />
                <span
                  className="h-2 w-1/3 rounded-full opacity-60"
                  style={{ background: template.swatch.accent }}
                />
              </div>
              <CardContent className="py-6">
                <h3 className="text-lg font-semibold">{template.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {vibe[template.value]}
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default TemplatesShowcase;
