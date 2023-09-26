import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import prisma from '@/lib/prismadb'
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Credenciales invalidas');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user?.hashedPassword) {
                    throw new Error('We do not recognize that email')
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
                if (!isCorrectPassword) {
                    throw new Error('We do not recognize that password.')
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };