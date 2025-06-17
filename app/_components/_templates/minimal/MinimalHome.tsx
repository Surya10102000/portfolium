import { UserData } from "@/types/userData"
import { aboutIsEmpty, arrayIsEmpty } from "../templateUtils";


const MinimalHome = ({data} : {data : UserData}) => {
    const {hero, about, education, projects, experience} = data;
  return (
    <div>MinimalHome
    
        <h1 className="text-4xl font-bold">{hero.name}</h1>
         {aboutIsEmpty(about) && (<h1>{about.aboutMe}</h1>)}
         {arrayIsEmpty(education)?<h1>Education is empty </h1> : <h1>Education is present</h1>}
         {arrayIsEmpty(projects)?<h1>projects is empty </h1> : <h1>projects is present</h1>}
         {arrayIsEmpty(experience)?<h1>experience is empty </h1> : <h1>experience is present</h1>}
        
    </div>
  )
}
export default MinimalHome