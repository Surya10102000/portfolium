'use client'
import { useParams } from "next/navigation"

const page = () => {
    const param = useParams()
  return (
    <div>{param.username}</div>
  )
}
export default page