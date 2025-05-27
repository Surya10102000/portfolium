import { RootState } from "@/redux/store";
import { Experience } from "@/types/userData";
import { useDispatch, useSelector } from "react-redux";
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

interface ExperienceSectionEditorProps {
  onCancel: () => void;
}

const ExperienceSectionEditor = ({
  onCancel,
}: ExperienceSectionEditorProps) => {
  const [activeForm, setActiveForm] = useState<boolean>(false);
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(
    null
  );
  const { data } = useGetPortfolioQuery();
  const [deleteExperience] = useDeleteExperienceMutation();

  // const experiences = useSelector(
  //   (state: RootState) => state.portfolio.data.experience
  // );
  const dispatch = useDispatch();

  const handleEditClick = (experience: Experience) => {
    setCurrentExperience(experience);
    setActiveForm(true);
  };

  const handleAddClick = () => {
    setCurrentExperience(null);
    setActiveForm(true);
  };

  const handleDeleteClick = async (experienceId: string) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        // Call the mutation function
        await deleteExperience(experienceId).unwrap(); // .unwrap() throws an error if the mutation fails
        console.log("Experience deleted successfully!");
        // RTK Query's invalidatesTags: ["Portfolio"] will automatically refetch the Portfolio data
        // so you might not need to call refetch() explicitly here if "Portfolio" tag is
        // invalidated by this deleteExperience mutation.
        // If your list doesn't update, ensure your "Portfolio" tag is being invalidated correctly
        // and also tagged on your data fetching query (e.g., getPortfolio: providesTags: ['Portfolio']).
      } catch (err) {
        console.error("Failed to delete the experience:", err);
        // You can display an error message to the user here
        // e.g., if (err.data?.message) alert(err.data.message);
        // else alert("An error occurred while deleting.");
      }
      setActiveForm(false)
    }
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
            onDelete={() => handleDeleteClick(experience._id as string)}
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
    </div>
  );
};
export default ExperienceSectionEditor;
