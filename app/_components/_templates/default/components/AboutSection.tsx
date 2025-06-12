import FadeIn from "@/app/_components/motion/FadeIn";
import { Contact, AboutSection as IAboutSection } from "@/types/userData";
import TechStack from "./TechStact";
import ContactLinks from "./ContactLinks";

const AboutSection = ({
  about,
  contact,
}: {
  about: IAboutSection;
  contact: Contact;
}) => {
  const { techStack, whatIDo, aboutMe } = about;
  return (
    <div id="about" className="lg:px-11">
      <FadeIn delay={1}>
        <div className="py-8">
          <p className="capitalize font-bold">about.</p>
        </div>
      </FadeIn>
      <div className="text-balance lg:flex">
        <div className="max-w-xl space-y-2">
          <FadeIn amount={0.2}>
            <p className="text-2xl lg:text-3xl text-foreground/80">{whatIDo}</p>
          </FadeIn>
          <TechStack techStack={techStack!} />
          <FadeIn margin="-30% 0px -10% 0px">
            <ContactLinks className="pt-px" contact={contact} />
          </FadeIn>
        </div>
        <FadeIn>
          <div>
            <p className="py-6 text-lg lg:text-xl text-right">{aboutMe}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
export default AboutSection;
