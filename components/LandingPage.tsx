"use client"

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomeP from './homePagecomponents/homeP';
import Loader from './Loader';

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>
      <Loader/>
    </div>;
  }

  if (!session) {
    return null; // This will briefly show while redirecting
  }

  return (
   
      <HomeP />
    
  );
};

export default Login;