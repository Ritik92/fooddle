"use client"
import SignIn from '@/app/api/auth/signin/page';
import { Button } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';

const Login = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : session ? (
        <p>Welcome! <Button onClick={()=> signOut()}>SignOut</Button>
</p>
        
      ) : (
        <p><SignIn/></p>
      )}
    </div>
  );
};

export default Login;
