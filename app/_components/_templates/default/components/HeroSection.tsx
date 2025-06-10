import { HeroSectionI } from "@/types/userData";
import Image from "next/image";
import { easeOut, motion as m } from "motion/react";

const HeroSection = ({ name, description, image, role }: HeroSectionI) => {
  return (
    <div className="h-[80lvh] " id="hero">
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

        <div className="font-semibold py-6 lg:px-12 flex-1 text-balance">
          {name.split(" ").map((n, i) => (
            <div
              className="text-7xl md:text-9xl uppercase tracking-tighter space-y-1"
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
                    animate: { y: 0 , transition : {
                        duration : 0.6,
                        ease : "easeOut"
                    }},
                  }}
                >
                  {n}
                </m.p>
              </m.div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div>email</div>
        <div>description</div>
      </div>
    </div>
  );
};
export default HeroSection;
