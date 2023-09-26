import { SafeUser } from "@/types";

export interface ICourseDetailComponent {
    data: any,
    courseId: any,
    currentUser: SafeUser | null
}