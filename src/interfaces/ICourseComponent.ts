import { SafeUser } from "@/types";

export interface ICourseComponent {
    data: any,
    key?: string,
    currentUser?: SafeUser | null
}