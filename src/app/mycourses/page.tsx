import { getCoursesByUser } from "@/services/course.service";
import MyCourseCard from "@/components/MyCourseCard";
import myUser from "../actions/getUser";


async function MyCourses({ params }: any) {
    const currentUser = await myUser();

    if (!currentUser) {
        return (
            <div className="flex items-center justify-center h-full mt-9">
                <h1>Not Authorized for this page</h1>
            </div>
        );
    }

    const courses = await getCoursesByUser();

    if (courses.length === 0) {
        return (
            <div className="flex items-center justify-center h-full mt-9">
                <h1>No courses found to delete or update</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap px-8">
            {courses.map((item: any) => (
                <MyCourseCard data={item} key={item.id} currentUser={currentUser} />
            ))}
        </div>
    )
}

export default MyCourses