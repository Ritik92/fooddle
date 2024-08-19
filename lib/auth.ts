
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from 'next-auth';
import prisma from '../lib/prisma';
import { use } from 'react';

export const NEXT_AUTH_CONFIG = {
    providers: [
      
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: 'Email', type: 'text', placeholder: 'youremail@thapar.edu' },
            password: { label: 'Password', type: 'password', placeholder: 'Enter Password ' },
          },
          
          async authorize(credentials: any) {
            const { username, password } = credentials;
            if (username.endsWith('@thapar.edu')){
              const user = await prisma.user.findFirst({
                where: {
                  email: username,     // Replace `username` with the actual email address
                  password: password   // Make sure the password is handled securely (e.g., hashed)
                }
              });
              
              return user;
            }
            else{
              return null;
            }
          },
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID||"",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET||"",
        })
    ],
    pages: {
      signIn: '/auth/signin',
       error: '/api/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async signIn({ account, profile }:any) {
        if (account.provider === 'google') {
          const email = profile.email;
          if (email.endsWith('@thapar.edu')) {
            await prisma.user.upsert({
              where: { email: profile.email },
              update: {
                name: profile.name,
               
              },
              create: {
                email: profile.email,
                name: profile.name,
                
              },
            });
            return true;
          } else {
            return false;
          }
        }
        return true;
      },
        jwt: async ({ user, token }: any) => {
        if (user) {
            token.uid = user.id;
        }
        return token;
        },
      session: ({ session, token, user }: any) => {
          if (session.user) {
              session.user.id = token.uid
              console.log(session);
          }
          return session
      }
    },
  }