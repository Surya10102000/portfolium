"use client";

import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import FadeIn from "@/app/_components/motion/FadeIn";
import { Button } from "@/components/ui/button";
import { AnimatedGradientText } from "@/components/AnimatedGradientText";

const Hero = () => {
  return (
    <section className="relative isolate flex min-h-[100lvh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,#63e_100%)]" />

      <div className="mx-auto w-full max-w-5xl px-6 py-24 text-center sm:py-32 lg:px-8">
        <FadeIn>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
            A portfolio worth
            <br />
            <AnimatedGradientText className="font-extrabold">
              sharing.
            </AnimatedGradientText>
          </h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Pick a template, fill in your work, and publish a live portfolio
            at your own link — no code, no design skills required.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base shadow-lg"
            >
              <Link href="/profile">
                Start building — it&apos;s free
                <Rocket className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-base"
            >
              <a href="#how-it-works">
                See how it works
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
