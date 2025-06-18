import { cn } from '@/lib/utils'
import './pattern.css'
const Pattern = ({className} : {className : string}) => {
  return (
   <div className={cn("pattern", className)}></div>
  )
}
export default Pattern