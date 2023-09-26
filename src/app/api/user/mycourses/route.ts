import { getCoursesByUser } from '@/services/course.service';
import { GenericResponse } from '@/interfaces/IGResponse'
import { NextResponse } from 'next/server'

// USER/MYCOURSES
//GET
export async function GET() {
    const gResponse: GenericResponse = {} as GenericResponse;

    try {
        const myCourses = await getCoursesByUser();

        gResponse.status = 200;
        gResponse.message = 'succes';
        gResponse.object = myCourses;

    } catch (error: any) {
        gResponse.status = 400;
        gResponse.message = error.message;
    }
    return NextResponse.json(gResponse, { status: gResponse.status });
}