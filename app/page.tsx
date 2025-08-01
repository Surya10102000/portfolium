"use client";
import { useSession, signIn } from "next-auth/react";
import {  LayoutTemplate, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";
import Footer from "./_components/footer/Footer";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Hero section */}
      <div className="relative h-[100lvh]">
      <div className="absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,#63e_100%)]"></div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Build Your Perfect Portfolio in Minutes
          </h1>
          <p className="mt-6 text-lg leading-8">
            Portfolium helps you create a stunning professional portfolio with
            our easy-to-use templates. No coding required - just pick a design
            and showcase your work.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 ">
            {
              <Link
                href="/profile"
                className="flex items-center text-white rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-primary focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get Started <Rocket className="ml-2 h-4 w-4" />
              </Link>
            }
            <a href="#templates" className="text-sm font-semibold leading-6 ">
              Browse Templates <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      </div>

      {/* Features section */}
      <div className="mx-auto py-12 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Easy Setup",
                description:
                  "Get your portfolio live in minutes with our intuitive editor.",
                icon: Rocket,
              },
              {
                name: "Beautiful Templates",
                description:
                  "Choose from professionally designed templates for any industry.",
                icon: LayoutTemplate,
              },
              {
                name: "No Coding",
                description:
                  "Everything works out of the box - no technical skills needed.",
                icon: Sparkles,
              },
            ].map((feature) => (
              <div
                key={feature.name}
                className="rounded-2xl p-8 shadow-primary bg-card backdrop-blur-sm hover:shadow-2xl"
              >
                <feature.icon
                  className="h-8 w-8 text-primary"
                  aria-hidden="true"
                />
                <h3 className="mt-6 text-lg font-semibold ">{feature.name}</h3>
                <p className="mt-2 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative isolate overflow-hidden bg-white/5 px-6 py-24 mt-12 sm:py-32 lg:px-8 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
            Ready to showcase your work?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8">
            Join thousands of professionals who use Portfolium to present their
            best work.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {session ? (
              <Link
                href="/dashboard"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-primary focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Go to Dashboard
              </Link>
            ) : (
              <button
                onClick={() => signIn()}
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold  shadow-sm hover:bg-primary focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get started
              </button>
            )}
            <Link href="#" className="text-sm font-semibold leading-6 ">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
