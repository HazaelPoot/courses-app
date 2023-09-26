import myUser from "@/app/actions/getUser";
import { NextResponse } from "next/server";
import prisma from '@/lib/prismadb'

export async function POST(req: Request, { params }: any) {
    const currentUser = await myUser();

    if (!currentUser) return NextResponse.error();

    const { courseId } = params;
    if (!courseId || typeof courseId !== 'string') throw new Error('Invalid courseId');

    let basketIds = [...(currentUser.basketIds || [])]
    basketIds.push(courseId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            basketIds
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: any) {
    const currentUser = await myUser();

    if (!currentUser) return NextResponse.error();

    const { courseId } = params;
    if (!courseId || typeof courseId !== 'string') throw new Error('Invalid courseId');

    let basketIds = [...(currentUser.basketIds || [])]
    basketIds = basketIds.filter((id) => id !== courseId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            basketIds
        }
    });

    return NextResponse.json(user);
}