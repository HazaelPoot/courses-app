import myUser from '@/app/actions/getUser';
import prisma from '@/lib/prismadb'

export async function getAllCourses(params: any) {
    try {
        // const currentUser = await myUser();
        // if (!currentUser) {
        //     throw new Error('Unauthorized');
        // }

        const result = params;
        let query: any = {};

        if (result) {
            query.name = {
                contains: result
            }
        }

        const courses = await prisma.course.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeCourse = courses.map((course) => ({
            ...course,
            createdAt: course.createdAt.toISOString()
        }));

        return safeCourse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getCourseById(params: any) {
    try {
        const courseId = params;
        const course = await prisma.course.findUnique({
            where: {
                id: courseId
            },
            include: {
                user: true
            }
        });

        if (!course) {
            throw new Error(`Id ${courseId} do not exist in the database`);
        }

        return {
            ...course,
            createdAt: course?.createdAt.toISOString(),
            user: {
                ...course?.user,
                createdAt: course?.user?.createdAt.toISOString(),
            }
        };

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getCoursesByUser() {
    try {
        const user = await myUser();

        const courses = await prisma.course.findMany({
            where: {
                userId: user?.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeCourse = courses.map((course) => ({
            ...course,
            createdAt: course.createdAt.toISOString()
        }));

        return safeCourse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createCourse(body: any) {
    try {
        // VALIDADOR DE INICIO DE SESSION
        const currentUser = await myUser();
        if (!currentUser) {
            throw new Error('Unauthorized');
        }

        const { name, author, imageSrc, description, price } = body;

        const course = await prisma.course.create({
            data: { name, author, imageSrc, description, price, userId: currentUser.id }
        });

        return course;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateCourse(params: any, body: any) {
    try {
        // VALIDADOR DE INICIO DE SESSION
        const courseId = params;
        const currentUser = await myUser();
        if (!currentUser) {
            throw new Error('Unauthorized');
        }

        // const { name, author, imageSrc, description, price } = body;

        const courseUpdate = await prisma.course.update({
            where: {
                id: courseId,
            },
            data: body
        });

        return courseUpdate;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteCourse(params: any) {
    try {
        const courseId = params;

        const currentUser = await myUser();
        if (!currentUser) {
            throw new Error('Unauthorized');
        }

        await getAllCourses(courseId);

        const course = await prisma.course.deleteMany({
            where: {
                id: courseId,
                userId: currentUser.id
            }
        });

        return course;
    } catch (error: any) {
        throw new Error(error.message);
    }
}