import myUser from '@/app/actions/getUser';
import prisma from '@/lib/prismadb'

export async function addToBasket(params: any) {
    try {
        const currentUser = await myUser();
        if (!currentUser) {
            throw new Error('Unauthorized');
        }

        const { courseId } = params;
        if (!courseId || typeof courseId !== 'string') {
            throw new Error('Invalid course Id');
        }

        let basketIds = [...(currentUser.basketIds || [])]
        basketIds.push(courseId);

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: basketIds
        });

        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

//PENDIENTE USAR EN LA API Y CAMBIAR LOS AXIOS JAJAJA
export async function removeToBasket(params: any) {
    try {
        const currentUser = await myUser();
        if (!currentUser) {
            throw new Error('Unauthorized');
        }

        const { courseId } = params;
        if (!courseId || typeof courseId !== 'string') {
            throw new Error('Invalid course Id');
        }

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

        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}