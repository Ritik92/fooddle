"use client"
import SignIn from '@/app/api/auth/signin/page';
import { Button } from '@nextui-org/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Image } from '@nextui-org/react';
import HomeP from './homePagecomponents/homeP';
const Login = () => {
  const { data: session, status } = useSession();

  return (
    <div className='flex flex-col'>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : session ? (
       <div>
        <HomeP/>
       </div>
        
      ) : (
       signIn()
      )}
    </div>
  );
};

export default Login;