import { updateHero } from "@/store/portfolioSlice";
import { RootState } from "@/store/store"
import { HeroSectionI } from "@/types/userData";
import { useDispatch, useSelector } from "react-redux"
import { HeroForm } from "./HeroForm";

const FormContainer = () => {
    const heroData = useSelector((state : RootState)=> state.portfolio.data.hero);
    const dispatch = useDispatch();

    const handleSubmit = (data: HeroSectionI) => {
        dispatch(updateHero(data))
      }
    
  return (
    <div className="max-w-2xl mx-auto p-6">
    <HeroForm
      initialData={heroData} 
      onSubmit={handleSubmit}
    />
  </div>
  )
}
export default FormContainer