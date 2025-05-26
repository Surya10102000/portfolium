"use client";
import { FolderGit, LayoutPanelTop, Pickaxe, SquareUser } from "lucide-react";
import Section from "./Section";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HeroForm } from "./Forms/HeroForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AboutSection, HeroSectionI, UserData } from "@/types/userData";
import { DialogDescription } from "@radix-ui/react-dialog";
import { updateAbout, updateHero } from "@/redux/portfolioSlice";
import AboutForm from "./Forms/AboutForm";
import ProjectSectionEditor from "./ProjectSectionEditor";
import ExperienceSectionEditor from "./ExperienceForm/ExperienceSectionEditor";
import {
  useGetPortfolioQuery,
  useUpdateAboutMutation,
  useUpdateHeroMutation,
} from "@/services/portfolioApi";

const EditProfileBox = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  // const data = useSelector((state: RootState) => state.portfolio.data);
  const {data}= useGetPortfolioQuery()
  const dispatch = useDispatch();
  const [updateHero] = useUpdateHeroMutation();
  const [updateAbout] = useUpdateAboutMutation()

  const handleSubmitHero = async (data: HeroSectionI) => {
    const response = await updateHero(data).unwrap();
    console.log(response);
    setActiveForm(null)
  };

  const handleSubmitAbout = async (data: AboutSection) => {
    const response = await updateAbout(data).unwrap();
    console.log(response);
    setActiveForm(null)
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
          {activeForm === "project" && (
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
          {activeForm === "experience" && (
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
