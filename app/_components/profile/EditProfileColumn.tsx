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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { HeroSectionI } from "@/types/userData";
import { DialogDescription } from "@radix-ui/react-dialog";

const EditProfileBox = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const data = useSelector((state: RootState) => state.portfolio.data.hero);

  const sections = [
    {
      id: "hero",
      title: "Hero Sectoin",
      description: "You name , role ,description and image",
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
                <DialogDescription>
                  Change {activeForm} contents
                </DialogDescription>
              </DialogHeader>
              <HeroForm
                initialData={data}
                onSubmit={(data) => {
                  console.log(data);
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
