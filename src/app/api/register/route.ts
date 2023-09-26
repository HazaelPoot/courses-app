import { GenericResponse } from "@/interfaces/IGResponse";
import { createUser } from "@/services/user.service";
import { NextResponse } from "next/server";

//POST
export async function POST(request: Request) {
    const gResponse: GenericResponse = {} as GenericResponse;

    try {
        const body = await request.json();
        const user = await createUser(body);

        gResponse.status = 200;
        gResponse.message = 'User register successful';
        gResponse.object = user;

    } catch (error: any) {
        gResponse.status = 400;
        gResponse.message = error.message;
    }
    return NextResponse.json(gResponse, { status: gResponse.status });
}

// async function emptyField(fields: any) {
//     const empty = new Promise((resolve) => {
//         if (!fields.name) resolve('El campo Name no puede estar vacio.');
//         else if (!fields.email) resolve('El campo Email no puede estar vacio.');
//         else if (!fields.password) resolve('El campo Password no puede estar vacio.');
//         else resolve(null);
//     });

//     return await empty;
// }