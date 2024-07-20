"use client"
import SignIn from '@/app/api/auth/signin/page';
import { useSession } from 'next-auth/react';

const Login = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : session ? (
        <p>Welcome, {session.user?.name}!</p>
      ) : (
        <p><SignIn/></p>
      )}
    </div>
  );
};

export default Login;
