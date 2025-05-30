import { Experience } from "@/types/userData";
import ExperienceCard from "./ExperienceCard";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ExperienceFormDialog from "./ExperienceFormDialog";
import {
  useDeleteExperienceMutation,
  useGetPortfolioQuery,
} from "@/services/portfolioApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ExperienceSectionEditorProps {
  onCancel: () => void;
}

const ExperienceSectionEditor = ({
  onCancel,
}: ExperienceSectionEditorProps) => {
  const [activeForm, setActiveForm] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [currentExperience, setCurrentExperience] = useState<Experience | null>(
    null
  );
  const { data } = useGetPortfolioQuery();
  const [deleteExperience, { isLoading }] = useDeleteExperienceMutation();

  const handleEditClick = (experience: Experience) => {
    setCurrentExperience(experience);
    setActiveForm(true);
  };

  const handleAddClick = () => {
    setCurrentExperience(null);
    setActiveForm(true);
  };

  const handleDeleteClick = async (experience: Experience) => {
    setCurrentExperience(experience);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async (experienceId: string) => {
    await deleteExperience(experienceId).unwrap(); 
    setDeleteDialogOpen(false);
    setActiveForm(false);
  };

  return (
    <div>
      {/* Experience Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-scroll h-[400px]">
        {/* Add New Project Card */}
        <Card
          className="hover:bg-accent/50 transition-colors cursor-pointer flex flex-col items-center justify-center h-full min-h-[200px]"
          onClick={handleAddClick}
        >
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <PlusCircle className="w-8 h-8 text-muted-foreground" />
            <span className="text-muted-foreground">Add New Experience</span>
          </CardContent>
        </Card>
        {data?.experience?.map((experience: Experience) => (
          <ExperienceCard
            key={experience._id}
            experience={experience}
            onEdit={() => handleEditClick(experience)}
            onDelete={() => handleDeleteClick(experience)}
          />
        ))}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>

      {/* Edit/Add Experience Dailog  */}
      {activeForm && (
        <ExperienceFormDialog
          open={activeForm}
          onOpenChange={setActiveForm}
          experience={currentExperience}
        />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleConfirmDelete(currentExperience?._id || "");
              }}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default ExperienceSectionEditor;
