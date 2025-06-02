"use client";
import { FolderGit, LayoutPanelTop, Pickaxe, SquareUser } from "lucide-react";
import Section from "./Section";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HeroForm } from "./Forms/HeroForm";
import { AboutSection, HeroSectionI } from "@/types/userData";
import { DialogDescription } from "@radix-ui/react-dialog";
import AboutForm from "./Forms/AboutForm";
import ProjectSectionEditor from "./ProjectForm/ProjectSectionEditor";
import ExperienceSectionEditor from "./ExperienceForm/ExperienceSectionEditor";
import {
  useGetPortfolioQuery,
  useUpdateAboutMutation,
  useUpdateHeroMutation,
} from "@/services/portfolioApi";

const EditProfileBox = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const { data } = useGetPortfolioQuery();
  const [updateHero] = useUpdateHeroMutation();
  const [updateAbout] = useUpdateAboutMutation();

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
      description: "You name, role, description and image",
      icon: <LayoutPanelTop />,
    },
    {
      id: "about",
      title: "About Section",
      description: "Your bio and and what you do ",
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
      description: "Your Experience and their details",
      icon: <Pickaxe />,
    },
  ];
  return (
    <div className="flex flex-col gap-2 overflow-y-scroll scrollable-content">
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
          {data?.hero && activeForm === "hero" && (
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
                }}
                onCancel={() => setActiveForm(null)}
              />
            </>
          )}

          {data?.about && activeForm === "about" && (
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
                  setActiveForm(null);
                }}
                onCancel={() => setActiveForm(null)}
              />
            </>
          )}
          {data?.projects && activeForm === "project" && (
            <>
              <DialogHeader>
                <DialogTitle className="capitalize">
                  {activeForm} Section
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Change {activeForm} contents
                </DialogDescription>
              </DialogHeader>
              {/* all the projects will come here */}
              <ProjectSectionEditor onCancel={() => setActiveForm(null)} />
            </>
          )}
          {data?.experience && activeForm === "experience" && (
            <>
              <DialogHeader>
                <DialogTitle className="capitalize">
                  {activeForm} Section
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Change {activeForm} contents
                </DialogDescription>
              </DialogHeader>
              {/* all the projects will come here */}
              <ExperienceSectionEditor onCancel={() => setActiveForm(null)} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EditProfileBox;
