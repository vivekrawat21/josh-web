import { useParams } from "react-router-dom";
import FullStack from "../components/FullStack";
import DigitalMarketing from "../components/DigitalMarketing";

const TopCourses = () => {
  let {coursename} = useParams();
  coursename = coursename.toLocaleLowerCase();
  if(coursename==='fullstack') return <FullStack />
  if(coursename==='digitalmarketing') return <DigitalMarketing/>
  return <div>404</div>
}

export default TopCourses