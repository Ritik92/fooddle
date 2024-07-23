
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from 'next-auth';
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
              //backend Logic
              return username;
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
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async signIn({ account, profile }:any) {
        if (account.provider === 'google') {
          const email = profile.email;
          if (email.endsWith('@thapar.edu')) {
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
          }
          return session
      }
    },
  }