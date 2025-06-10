import { HeroSectionI } from "@/types/userData";
import Image from "next/image";

const HeroSection = ({ name, description, image, role }: HeroSectionI) => {
  return (
    <div className="h-[80lvh] p-4" id="hero">
      <div>
        {image && <div><Image src='/1733255180756.jpg' className="rounded-full" alt={name} width={100} height={100}/></div>}
        <div>
          {name.split(" ").map((n, i)=><div key={i}><p>{n}</p></div>)}
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
