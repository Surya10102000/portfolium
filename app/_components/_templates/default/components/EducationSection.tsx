import { Education } from "@/types/userData";

const EducationSection = ({ education }: { education: Education[] }) => {
  const edu = education[0];
  return (
    <div className="h-screen" id="education">
      education
      <div>{}</div>
    </div>
  );
};
export default EducationSection;
