import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from 'next-auth';
import prisma from '../lib/prisma';

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Email', type: 'text', placeholder: 'youremail@thapar.edu' },
                password: { label: 'Password', type: 'password', placeholder: 'Enter Password ' },
            },
            async authorize(credentials: any) {
                const { username, password } = credentials;
                if (true) {
                    const user = await prisma.user.findFirst({
                        where: {
                            email: username,
                            password: password
                        }
                    });
                    return user;
                } else {
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        })
    ],
    pages: {
        signIn: '/auth/signin',
        error: '/api/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile }: any) {
            if (account.provider === 'google') {
                const email = profile.email;
                if (email.endsWith('@thapar.edu')) {
                    const user = await prisma.user.upsert({
                        where: { email: profile.email },
                        update: {
                            name: profile.name,
                            isVendor: false,
                        },
                        create: {
                            email: profile.email,
                            name: profile.name,
                            isVendor: false,
                        },
                    });
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user, account }: any) {
            if (user) {
                token.id = user.id;
                token.isVendor = user.isVendor;
            }
            if (account && account.provider === 'google') {
                const dbUser = await prisma.user.findUnique({
                    where: { email: token.email },
                });
                if (dbUser) {
                    token.id = dbUser.id;
                    token.isVendor = dbUser.isVendor;
                }
            }
            return token;
        },
        session: ({ session, token }: any) => {
            if (session.user) {
                session.user.id = token.id;
                session.user.isVendor = token.isVendor;
            }
            return session;
        },
    },
};