import CourseDetail from "@/components/CourseDetail";
import myUser from "@/app/actions/getUser"
import axios from "axios";

async function loadCourse(courseId: string) {
  const { data } = await axios.get(`http://localhost:3000/api/course/${courseId}`);
  return data.object;
}

export default async function page({ params }: any) {
  const course = await loadCourse(params.courseId);
  const currentUser = await myUser();

  return (
    <CourseDetail data={course} courseId={course?.id} currentUser={currentUser} />
  )
}