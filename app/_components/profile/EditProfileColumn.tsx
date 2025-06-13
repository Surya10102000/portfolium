"use client";
import { FolderGit, LayoutPanelTop, LucideMousePointerClick, Pickaxe, SquareUser } from "lucide-react";
import Section from "./Section";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HeroForm } from "./Forms/HeroForm";
import { AboutSection, Contact, HeroSectionI } from "@/types/userData";
import AboutForm from "./Forms/AboutForm";
import ProjectSectionEditor from "./ProjectForm/ProjectSectionEditor";
import ExperienceSectionEditor from "./ExperienceForm/ExperienceSectionEditor";
import {
  useGetPortfolioQuery,
  useUpdateAboutMutation,
  useUpdateContactMutation,
  useUpdateHeroMutation,
} from "@/services/portfolioApi";
import ContactForm from "./Forms/ContactForm";

const EditProfileBox = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const { data } = useGetPortfolioQuery();
  const [updateHero] = useUpdateHeroMutation();
  const [updateAbout] = useUpdateAboutMutation();
  const [updateContact] = useUpdateContactMutation();

  const handleSubmitContact = async(data : Contact)=>{
    await updateContact(data).unwrap()
    setActiveForm(null)
  }

  const handleSubmitHero = async (data: HeroSectionI) => {
    await updateHero(data).unwrap();
    setActiveForm(null);
  };

  const handleSubmitAbout = async (data: AboutSection) => {
    await updateAbout(data).unwrap();
    setActiveForm(null);
  };

  const sections = [
    {
      id: "hero",
      title: "Hero Section",
      description: "Your name, role, description and image",
      icon: <LayoutPanelTop />,
    },
    {
      id: "about",
      title: "About Section",
      description: "Your bio and what you do",
      icon: <SquareUser />,
    },
    {
      id: "project",
      title: "Project Section",
      description: "Your projects and their details",
      icon: <FolderGit />,
    },
    {
      id: "experience",
      title: "Experience Section",
      description: "Your work experience details",
      icon: <Pickaxe />,
    },
    {
      id: "contact",
      title: "Contact Section",
      description: "Contact Details",
      icon: <LucideMousePointerClick />,
    },
  ];

  return (
    <div className="flex flex-col gap-2 overflow-y-scroll scrollable-content h-[88vh] px-4` ">
      {sections.map((section) => (
        <Section
          key={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          onClick={() => setActiveForm(section.id)}
        />
      ))}

      <Dialog open={!!activeForm} onOpenChange={(open) => !open && setActiveForm(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="capitalize">
              {activeForm ? `${activeForm} Section` : "Edit Section"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {activeForm === "hero" && "Edit your name, role, description and image"}
              {activeForm === "about" && "Edit your bio and what you do"}
              {activeForm === "project" && "Edit your projects and their details"}
              {activeForm === "experience" && "Edit your work experience details"}
            </DialogDescription>
          </DialogHeader>

          {data?.hero && activeForm === "hero" && (
            <HeroForm
              initialData={data.hero}
              onSubmit={handleSubmitHero}
              onCancel={() => setActiveForm(null)}
            />
          )}

          {data?.about && activeForm === "about" && (
            <AboutForm
              initialData={data.about}
              onSubmit={handleSubmitAbout}
              onCancel={() => setActiveForm(null)}
            />
          )}

          {data?.projects && activeForm === "project" && (
            <ProjectSectionEditor onCancel={() => setActiveForm(null)} />
          )}

          {data?.experience && activeForm === "experience" && (
            <ExperienceSectionEditor onCancel={() => setActiveForm(null)} />
          )}

          {data?.contact && activeForm === "contact" && (
            <ContactForm
              initialData={data.contact}
              onSubmit={handleSubmitContact}
              onCancel={() => setActiveForm(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfileBox;  