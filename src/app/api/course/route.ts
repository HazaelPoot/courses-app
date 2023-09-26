import { createCourse, getAllCourses } from "@/services/course.service";
import { GenericResponse } from "@/interfaces/IGResponse";
import { NextResponse } from "next/server";
import myUser from "@/app/actions/getUser";

// COURSES
//GET
export async function GET(req: Request, { params }: any) {
    const gResponse: GenericResponse = {} as GenericResponse;

    try {
        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name');

        const course = await getAllCourses(name);

        gResponse.status = 200;
        gResponse.message = 'Success';
        gResponse.object = course;
    } catch (error: any) {
        gResponse.status = 400;
        gResponse.message = error.message;
    }

    return NextResponse.json(gResponse, { status: gResponse.status });
}

//POST
export async function POST(request: Request) {
    const gResponse: GenericResponse = {} as GenericResponse;

    try {
        const currentUser = await myUser();
        const body = await request.json();

        const course = await createCourse(body);

        gResponse.status = 200;
        gResponse.message = 'Success';
        gResponse.object = course;

    } catch (e: any) {
        gResponse.status = 400;
        gResponse.message = e.message;
    }
    return NextResponse.json(gResponse, { status: gResponse.status });
}