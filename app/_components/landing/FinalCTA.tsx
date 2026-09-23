"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/app/_components/motion/FadeIn";

const FinalCTA = () => {
  const { data: session } = useSession();

  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 [background:radial-gradient(125%_125%_at_50%_90%,var(--background)_40%,#63e_100%)]" />

      <FadeIn className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Ready to show your work?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Build your portfolio today — it takes minutes, not weekends.
        </p>
        <div className="mt-10 flex items-center justify-center">
          {session ? (
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 py-7 text-lg shadow-lg"
            >
              <Link href="/dashboard">
                Go to dashboard
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button
              size="lg"
              className="rounded-full px-10 py-7 text-lg shadow-lg"
              onClick={() => signIn()}
            >
              Get started free
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          )}
        </div>
      </FadeIn>
    </section>
  );
};

export default FinalCTA;
