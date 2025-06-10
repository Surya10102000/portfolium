import { HeroSectionI } from "@/types/userData";
import Image from "next/image";
import { motion as m } from "motion/react";
import FadeIn from "@/app/_components/motion/FadeIn";

const HeroSection = ({ hero }: { hero: HeroSectionI }) => {
  const { image, name, description, role } = hero;
  return (
    <div className="h-[80lvh] tracking-tighter lg:px-12" id="hero">
      <div className="md:flex md:flex-row-reverse md:justify-between gap-2">
        {image && (
          <div className="mt-12 lg:mt-2">
            <Image
              src="/1733255180756.jpg"
              className="rounded-full w-26 lg:w-40"
              alt={name}
              width={100}
              height={100}
            />
          </div>
        )}

        <div className="font-semibold py-6 flex-1">
          {name.split(" ").map((n, i) => (
            <div
              className="text-7xl md:text-9xl uppercase space-y-1 wrap-break-word"
              key={i}
            >
              <m.div
                className="overflow-hidden "
                initial="initial"
                animate="animate"
              >
                <m.p
                  variants={{
                    initial: { y: "100%" },
                    animate: {
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut",
                      },
                    },
                  }}
                >
                  {n}
                </m.p>
              </m.div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 md:flex">
        <div>
          <FadeIn>
            <p className="text-xl font-bold flex-1/3">{role}</p>
          </FadeIn>
        </div>
        <div className="flex-1/3">
          <FadeIn>
            <p className="text-right text-balance text-2xl tracking-wide ">
              {description}
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
