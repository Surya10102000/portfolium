"use client";
import { LayoutPanelTop, SquareUser } from "lucide-react";
import Section from "./Section";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HeroForm } from "./Forms/HeroForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AboutSection, HeroSectionI } from "@/types/userData";
import { DialogDescription } from "@radix-ui/react-dialog";
import { updateAbout, updateHero } from "@/store/portfolioSlice";
import AboutForm from "./Forms/AboutForm";

const EditProfileBox = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const data = useSelector((state: RootState) => state.portfolio.data);
  const dispatch = useDispatch();

  const handleSubmitHero = (data: HeroSectionI)=>{
    dispatch(updateHero(data))
  }

  const handleSubmitAbout = (data: AboutSection)=>{
    dispatch(updateAbout(data))
  }

  const sections = [
    {
      id: "hero",
      title: "Hero Section",
      description: "You name, role, description and image",
      icon: <LayoutPanelTop />,
    },
    {
      id: "about",
      title: "About Section",
      description: "Your bio and and what you do ",
      icon: <SquareUser />,
    },
  ];
  return (
    <div className="flex flex-col gap-2 ">
      {sections.map((section) => (
        <Section
          key={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          onClick={() => setActiveForm(section.id)}
        />
      ))}

      <Dialog
        open={!!activeForm}
        onOpenChange={(open) => !open && setActiveForm(null)}
      >
        <DialogContent className="max-w-2xl">
          {activeForm === "hero" && (
            <>
              <DialogHeader>
                <DialogTitle className="capitalize">
                  {activeForm} Section
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Change {activeForm} contents
                </DialogDescription>
              </DialogHeader>
              <HeroForm
                initialData={data.hero}
                onSubmit={(data) => {
                  handleSubmitHero(data);
                  setActiveForm(null);
                }}
                onCancel={() => setActiveForm(null)}
              />
            </>
          )}

        
          {activeForm === "about" && (
            <>
              <DialogHeader>
                <DialogTitle className="capitalize">
                  {activeForm} Section
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Change {activeForm} contents
                </DialogDescription>
              </DialogHeader>
              <AboutForm
                initialData={data.about}
                onSubmit={(data) => {
                  handleSubmitAbout(data);
                  console.log(data)
                  setActiveForm(null);
                }}
                onCancel={() => setActiveForm(null)}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EditProfileBox;
