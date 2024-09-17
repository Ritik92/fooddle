"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeP from './homePagecomponents/homeP';
import Loader from './Loader';
import VendorLandingPage from './vendorlandingpage';
import axios from 'axios';

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isVendor, setIsVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    } else if (status === 'authenticated') {
      const { email } = session.user;
      console.log(session)
      axios.get(`/api/navigate?email=${email}`)
        .then(response => {
          setIsVendor(response.data.isVendor);
        })
        .catch(error => {
          console.error('Error checking vendor status:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [status, router, session]);

  if (status === 'loading' || loading) {
    return <Loader />;
  }
  let condition=(session.user as any).isVendor
  if (!session) {
    return null; // This will briefly show while redirecting
  }
  if (condition) {
    return <VendorLandingPage />;
  } else {
    return <HomeP />;
  }
};

export default Login;
