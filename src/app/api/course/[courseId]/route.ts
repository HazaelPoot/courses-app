import { getCourseById, updateCourse } from "@/services/course.service";
import { GenericResponse } from "@/interfaces/IGResponse";
import { NextResponse } from "next/server";

//GET/:COURSEID
export async function GET(req: Request, { params }: any) {
    const gResponse: GenericResponse = {} as GenericResponse;

    try {
        const { courseId } = params;

        const course = await getCourseById(courseId);

        gResponse.status = 200;
        gResponse.message = 'Success';
        gResponse.object = course;
    } catch (error: any) {
        gResponse.status = 400;
        gResponse.message = error.message;
    }

    return NextResponse.json(gResponse, { status: gResponse.status });
}

//PUT/:COURSEID + BODY
export async function PUT(req: Request, { params }: any) {
    const gResponse: GenericResponse = {} as GenericResponse;

    try {
        const { courseId } = params;
        const body = await req.json();

        const courseUpdate = await updateCourse(courseId, body);

        gResponse.status = 201;
        gResponse.message = 'Course updated succesfull';
        gResponse.object = courseUpdate;
    } catch (error: any) {
        gResponse.status = 400;
        gResponse.message = error.message;
    }

    return NextResponse.json(gResponse, { status: gResponse.status })
}