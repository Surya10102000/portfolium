import { Education as IEducation} from "@/types/userData"
import { SectionHeader } from "../../utils/SectionHeader"
import EducationItem from "./EducationItem"

const Education = ({education } : { education : IEducation[]}) => {
  return (
    <section className="section-wrapper" id="education">
          <SectionHeader title="Education" dir="l" />
          {education.map((item,i) => (
            <EducationItem key={i} {...item} />
          ))}
        </section>
  )
}
export default Education