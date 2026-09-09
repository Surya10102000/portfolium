"use client";
import { ArrowLeft, FolderGit, LayoutPanelTop, LucideMousePointerClick, Pickaxe, SquareUser } from "lucide-react";
import Section from "./Section";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

interface EditProfileBoxProps {
  // When true, the active section's form replaces the list in place instead
  // of opening in its own Dialog. Use this when the box is already rendered
  // inside another Dialog (e.g. the mobile Navbar trigger) so we don't stack
  // a second Dialog (and a second overlay) on top of the first.
  embedded?: boolean;
  className?: string;
}

const EditProfileBox = ({ embedded = false, className }: EditProfileBoxProps) => {
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

  const activeSection = sections.find((section) => section.id === activeForm);

  const activeFormContent = (
    <>
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
    </>
  );

  const sectionList = (
    <div className="flex flex-col gap-2">
      {sections.map((section) => (
        <Section
          key={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          onClick={() => setActiveForm(section.id)}
        />
      ))}
    </div>
  );

  if (embedded) {
    return (
      <div className={cn("flex flex-col gap-2 overflow-y-auto scrollable-content", className)}>
        {activeForm ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveForm(null)}
                aria-label="Back to sections"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <p className="font-medium">{activeSection?.title}</p>
                <p className="text-sm text-muted-foreground">{activeSection?.description}</p>
              </div>
            </div>
            {activeFormContent}
          </div>
        ) : (
          sectionList
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2 overflow-y-scroll scrollable-content", className ?? "h-[88vh]")}>
      {sectionList}

      <Dialog open={!!activeForm} onOpenChange={(open) => !open && setActiveForm(null)}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-2xl">
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

          {activeFormContent}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfileBox;
