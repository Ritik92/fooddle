"use client"
import SignIn from '@/app/api/auth/signin/page';
import { Button } from '@nextui-org/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Image } from '@nextui-org/react';
const Login = () => {
  const { data: session, status } = useSession();

  return (
    <div className='flex flex-col'>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : session ? (
        
        <p>
              <h1>Welcome, {session.user?.name ?? "User"}!</h1>
      {session.user?.image && (
        <Image className='rounded-full'
          src={session.user.image} 
          alt="User profile" 
          width={100} 
          height={100}
        />
      )}
           <Button color='danger' onClick={()=> signOut()}>SignOut</Button>
</p> 
        
      ) : (
       signIn()
      )}
    </div>
  );
};

export default Login;