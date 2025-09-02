import { AnimatedGradientText } from "@/components/AnimatedGradientText";
import Image from "next/image";
import Link from "next/link";

const UserNotFound = () => {
  return (
    <div className="h-screen w-full">
      <section className="home grid h-screen pt-32 pb-16">
        <div className="mx-auto container grid content-center gap-12 lg:max-w-5xl lg:grid-cols-2 lg:items-center">
          <div className=" justify-self-center text-center lg:text-left">
            <p className="pb-2 font-semibold">Error 404</p>
            <h1 className="pb-4 text-5xl font-bold lg:text-6xl">Hey Buddy</h1>
            <p className="pb-8 font-semibold">
              We can&apos;t seem to find the user &rsquo;( <br />
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gray-900 hover:bg-gray-800 py-4 px-8 font-bold text-white"
            >
              Try Portfolium
            </Link>
          </div>

          <div className=" justify-self-center">
            <Image
              width={400}
              height={400}
              src="/ghost.png"
              className="w-64 animate-floting lg:w-[400px]"
              alt="home image"
            />
            <div className=" mx-auto h-8 w-36 animate-shadow rounded-[50%] bg-gray-900/30 blur-md lg:w-64"></div>
          </div>
        </div>

        <div className=" flex items-center justify-center gap-2 self-end text-sm font-semibold">
          <p>Get your portfolio website</p>
          <p>|</p>
          <AnimatedGradientText>
            <Link href="/">
              <p className="text-lg">Portfolium</p>
            </Link>
          </AnimatedGradientText>
        </div>
      </section>
    </div>
  );
};
export default UserNotFound;
