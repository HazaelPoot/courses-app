import prisma from '@/lib/prismadb'
import bcrypt from "bcrypt";

export async function createUser(body: any) {
    try {
        const { name, email, password } = body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('User with this email already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: { name, email, hashedPassword }
        });

        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}